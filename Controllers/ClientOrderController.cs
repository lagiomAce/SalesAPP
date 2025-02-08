using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using SalesAPI.Data;
using SalesAPI.Models;

namespace SalesAPI.Controllers
{
    [ApiController]
    [Route("api/client-orders")]
    public class ClientOrdersController : ControllerBase
    {
        private readonly SalesDbContext _context;

        public ClientOrdersController(SalesDbContext context)
        {
            _context = context;
        }

        [HttpGet("{custId}")]
        public async Task<ActionResult<IEnumerable<ClientOrderDto>>> GetClientOrders(int custId)
        {
            var orders = await _context.ClientOrders
                .FromSqlRaw("EXEC GetClientOrders @CustID={0}", custId) 
                .ToListAsync();

            if (orders == null || orders.Count == 0)
            {
                return NotFound("No se encontraron órdenes para este cliente.");
            }

            return orders;
        }
    }
}
