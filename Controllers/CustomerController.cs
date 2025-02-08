using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SalesAPI.Data;
using SalesAPI.Models;

namespace SalesAPI.Controllers
{
    [ApiController]
    [Route("api/customers")]
    public class CustomersController : ControllerBase
    {
        private readonly SalesDbContext _context;

        public CustomersController(SalesDbContext context)
        {
            _context = context;
        }


        [HttpGet("with-orders")]
        public async Task<ActionResult<IEnumerable<CustomerOrderPrediction>>> GetCustomersWithOrders(int? custId = null)
        {
            var customers = await _context.CustomerOrderPredictions
                .FromSqlRaw("EXEC GetNextPredictedOrder @CustID={0}", custId.HasValue ? custId.Value : (object)DBNull.Value)
                .ToListAsync();

           
            if (customers == null || customers.Count == 0)
            {
                return NotFound("No se encontraron predicciones de compras.");
            }

            return Ok(customers);
        }

    }
}
