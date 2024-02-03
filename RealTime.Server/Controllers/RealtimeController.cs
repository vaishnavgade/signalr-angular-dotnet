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

    private Action TransferRealTimeData()
    {
        return () => _hub.Clients.All.SendAsync("TransferRealtimeData", DataManager.GetData());
    }

    [HttpGet("startauto")]
    public IActionResult StartAuto()
    {
        if(!_timer.IsTimerStarted)
        {
            _timer.PrepareTimer(TransferRealTimeData());
        }
        return Ok(new { Message = "Started realtime data transfer until 60 seconds elapses" });
    }

    [HttpGet("start")]
    public IActionResult Start()
    {
        if(!_timer.IsTimerStarted)
        {
            _timer.PrepareManualTimer(TransferRealTimeData());
        }
        return Ok(new { Message = "Started realtime data transfer until stopped" });
    }

    [HttpGet("stop")]
    public IActionResult Stop()
    {
        if(_timer.IsTimerStarted)
        {
            _timer.StopTimer();
        }
        return Ok(new { Message = "Stopped realtime data transfer" });
    }
}