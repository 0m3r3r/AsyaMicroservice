using System.Threading.Tasks;
using System;

namespace Microsoft.eShopOnContainers.Services.Identity.API;

public class SeedData
{
    public static async Task EnsureSeedData(IServiceScope scope, IConfiguration configuration, Microsoft.Extensions.Logging.ILogger logger)
    {
        var retryPolicy = CreateRetryPolicy(configuration, logger);
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        await retryPolicy.ExecuteAsync(async () =>
        {
            await context.Database.MigrateAsync();

            var userMgr = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var omer = await userMgr.FindByNameAsync("omer");

            if (omer == null)
            {
                omer = new ApplicationUser
                {
                    UserName = "omer",
                    Email = "omer.erdogan@email.com",
                    EmailConfirmed = true,
                    CardHolderName = "omer ERDOĞAN",
                    CardNumber = "4012888888881881",
                    CardType = 1,
                    City = "Ankara",
                    Country = "U.S.",
                    Expiration = "12/24",
                    Id = Guid.NewGuid().ToString(),
                    LastName = "ERDOĞAN",
                    Name = "omer",
                    PhoneNumber = "1234567890",
                    ZipCode = "98052",
                    State = "WA",
                    Street = "15703 NE 61st Ct",
                    SecurityNumber = "571"
                };

                var result = userMgr.CreateAsync(omer, "Pass123$").Result;

                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                logger.LogDebug("omer created");
            }
            else
            {
                logger.LogDebug("omer already exists");
            }

            var onur = await userMgr.FindByNameAsync("onur");

            if (onur == null)
            {
                onur = new ApplicationUser
                {
                    UserName = "onur",
                    Email = "onur@email.com",
                    EmailConfirmed = true,
                    CardHolderName = "onur",
                    CardNumber = "4012888888881881",
                    CardType = 1,
                    City = "Redmond",
                    Country = "U.S.",
                    Expiration = "12/24",
                    Id = Guid.NewGuid().ToString(),
                    LastName = "onur",
                    Name = "onur",
                    PhoneNumber = "1234567890",
                    ZipCode = "98052",
                    State = "WA",
                    Street = "15703 NE 61st Ct",
                    SecurityNumber = "456"
                };

                var result = await userMgr.CreateAsync(onur, "Pass123$");

                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.First().Description);
                }

                logger.LogDebug("onur created");
            }
            else
            {
                logger.LogDebug("onur already exists");
            }
        });
    }

    private static AsyncPolicy CreateRetryPolicy(IConfiguration configuration, Microsoft.Extensions.Logging.ILogger logger)
    {
        var retryMigrations = false;
        bool.TryParse(configuration["RetryMigrations"], out retryMigrations);

        // Only use a retry policy if configured to do so.
        // When running in an orchestrator/K8s, it will take care of restarting failed services.
        if (retryMigrations)
        {
            return Policy.Handle<Exception>().
                WaitAndRetryForeverAsync(
                    sleepDurationProvider: retry => TimeSpan.FromSeconds(5),
                    onRetry: (exception, retry, timeSpan) =>
                    {
                        logger.LogWarning(
                            exception,
                            "Exception {ExceptionType} with message {Message} detected during database migration (retry attempt {retry})",
                            exception.GetType().Name,
                            exception.Message,
                            retry);
                    }
                );
        }

        return Policy.NoOpAsync();
    }
}
