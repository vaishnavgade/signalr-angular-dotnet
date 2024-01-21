using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Realtime.Server.DataStorage;
using Realtime.Server.Models;
using Realtime.Server.TimerFeatures;

namespace Realtime.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RealtimeController : Controller
{
    private readonly IHubContext<RealtimeHub> _hub;
    private readonly TimerManager _timer;

    public RealtimeController(IHubContext<RealtimeHub> hub, TimerManager timer)
    {
        _hub = hub;
        _timer = timer;
    }

    [HttpGet]
    public IActionResult Get()
    {
        if(!_timer.IsTimerStarted)
        {
            _timer.PrepareTimer(() => _hub.Clients.All.SendAsync("TransferRealtimeData", DataManager.GetData()));
        }
        return Ok(new { Message = "Request Completed" });
    }
}