using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using SalesAPI.Data;
using SalesAPI.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace SalesAPI.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrdersController : ControllerBase
    {
        private readonly SalesDbContext _context;

        public OrdersController(SalesDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> CreateOrder([FromBody] NewOrderDto newOrder)
        {
            if (newOrder == null)
            {
                return BadRequest("Los datos de la orden son requeridos.");
            }

            // Crear parámetros de entrada
            var parameters = new[]
            {
        new SqlParameter("@EmpID", newOrder.EmpID),
        new SqlParameter("@ShipperID", newOrder.ShipperID),
        new SqlParameter("@ShipName", newOrder.ShipName),
        new SqlParameter("@ShipAddress", newOrder.ShipAddress),
        new SqlParameter("@ShipCity", newOrder.ShipCity),
        new SqlParameter("@OrderDate", newOrder.OrderDate),
        new SqlParameter("@RequiredDate", newOrder.RequiredDate),
        new SqlParameter("@ShippedDate", (object)newOrder.ShippedDate ?? DBNull.Value),
        new SqlParameter("@Freight", newOrder.Freight),
        new SqlParameter("@ShipCountry", newOrder.ShipCountry),
        new SqlParameter("@CustomerID", newOrder.CustomerID),
        new SqlParameter("@ProductID", newOrder.ProductID),
        new SqlParameter("@UnitPrice", newOrder.UnitPrice),
        new SqlParameter("@Qty", newOrder.Qty),
        new SqlParameter("@Discount", newOrder.Discount),
        new SqlParameter("@OrderID", SqlDbType.Int) { Direction = ParameterDirection.Output },
        new SqlParameter("@CustID", SqlDbType.Int) { Direction = ParameterDirection.Output }
    };

          
            await _context.Database.ExecuteSqlRawAsync("EXEC AddNewOrder @EmpID, @ShipperID, @ShipName, @ShipAddress, @ShipCity, @OrderDate, @RequiredDate, @ShippedDate, @Freight, @ShipCountry, @CustomerID, @ProductID, @UnitPrice, @Qty, @Discount, @OrderID OUT, @CustID OUT", parameters);

            int orderId = (int)parameters[15].Value;
            int custId = (int)parameters[16].Value;

            return Ok(new { OrderID = orderId, CustID = custId });
        }




    }
}
