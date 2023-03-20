namespace Webhooks.API.Infrastructure;

public class WebhooksContext : DbContext
{

    public WebhooksContext(DbContextOptions<WebhooksContext> options) : base(options)
    {
    }
    public DbSet<WebhookSubscription> Subscriptions { get; set; }
}

public class WebhooksContextDesignFactory : IDesignTimeDbContextFactory<WebhooksContext>
{
    public WebhooksContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<WebhooksContext>()
            .UseNpgsql("Host=localhost;Port=5432;Database=AsyaOrderManagement.Services.CatalogDb;Username=postgres;Password=asya123*;");

        return new WebhooksContext(optionsBuilder.Options);
    }
}
