using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Microsoft.eShopOnContainers.Services.Catalog.API.Infrastructure.EntityConfigurations;

class CatalogModelEntityTypeConfiguration
    : IEntityTypeConfiguration<CatalogModel>
{
    public void Configure(EntityTypeBuilder<CatalogModel> builder)
    {
        builder.ToTable("CatalogModel");

        builder.HasKey(ci => ci.Id);

        builder.Property(ci => ci.Id)
            .UseHiLo("catalog_model_hilo")
            .IsRequired();

        builder.Property(cb => cb.Model)
            .IsRequired()
            .HasMaxLength(100);
    }
}