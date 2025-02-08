using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using SalesAPI.Data;
using SalesAPI.Models;

namespace SalesAPI.Controllers
{
    [ApiController]
    [Route("api/shippers")]
    public class ShippersController : ControllerBase
    {
        private readonly SalesDbContext _context;

        public ShippersController(SalesDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShipperDto>>> GetShippers()
        {
            var shippers = await _context.ShipperDtos
                .FromSqlRaw("EXEC GetShippers") 
                .ToListAsync();

            return shippers;
        }
    }
}
