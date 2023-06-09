﻿using Npgsql;

namespace Microsoft.eShopOnContainers.Services.Ordering.API.Application.Queries;
    
public class OrderQueries
    : IOrderQueries
{
    private string _connectionString = string.Empty;

    public OrderQueries(string constr)
    {
        _connectionString = !string.IsNullOrWhiteSpace(constr) ? constr : throw new ArgumentNullException(nameof(constr));
    }


    public async Task<Order> GetOrderAsync(int id)
    {
        using var connection = new NpgsqlConnection(_connectionString);
        connection.Open();

        var result = await connection.QueryAsync<dynamic>(
                                @"select o.""Id"" as ordernumber, o.OrderDate as date, o.Description as description,
                                          o.Address_City as city,
                                          o.Address_Country as country,
                                          o.Address_State as state,
                                          o.Address_Street as street,
                                          o.Address_ZipCode as zipcode,
                                          os.Name as status,
                                          oi.ProductName as productname,
                                          oi.Units as units,
                                          oi.UnitPrice as unitprice,
                                          oi.PictureUrl as pictureurl
                                        from ordering.Orders as o
                                          left outer join ordering.Orderitems as oi
                                            on o.Id = oi.orderid
                                          left outer join ordering.orderstatus as os
                                            on o.OrderStatusId = os.Id
                                        where o.Id = @id"
                , new { id }
            );

        if (result.AsList().Count == 0)
            throw new KeyNotFoundException();

        return MapOrderItems(result);
    }

    public async Task<IEnumerable<OrderSummary>> GetOrdersFromUserAsync(Guid userId)
    {
        using var connection = new NpgsqlConnection(_connectionString);
        connection.Open();

        return await connection.QueryAsync<OrderSummary>(@"select o.""Id"" as ordernumber, o.""OrderDate"" as ""date"", os.""Name"" as ""status"",
                                              sum((oi.units * oi.unitprice)) as total  from ""ordering"".""Orders"" as o
                                              left outer join ""ordering"".""orderitems"" as oi on o.Id = oi.orderid
                                              left outer join ""ordering"".""orderstatus"" as os on o.OrderStatusId = os.Id on o.BuyerId = ob.Id
                                            where ob.IdentityGuid = @userId
                                            group by o.""Id"", o.""OrderDate"", os.""Name""
                                            order by o.""Id""", new { userId });
    }

    public async Task<IEnumerable<CardType>> GetCardTypesAsync()
    {
        using var connection = new NpgsqlConnection(_connectionString);
        connection.Open();

        return await connection.QueryAsync<CardType>("SELECT * FROM ordering.cardtypes");
    }

    private Order MapOrderItems(dynamic result)
    {
        var order = new Order
        {
            ordernumber = result[0].ordernumber,
            date = result[0].date,
            status = result[0].status,
            description = result[0].description,
            street = result[0].street,
            city = result[0].city,
            zipcode = result[0].zipcode,
            country = result[0].country,
            orderitems = new List<Orderitem>(),
            total = 0
        };

        foreach (dynamic item in result)
        {
            var orderitem = new Orderitem
            {
                productname = item.productname,
                units = item.units,
                unitprice = (double)item.unitprice,
                pictureurl = item.pictureurl
            };

            order.total += item.units * item.unitprice;
            order.orderitems.Add(orderitem);
        }

        return order;
    }
}
