namespace Realtime.Server.TimerFeatures;

public class TimerManager
{
    private Timer? _timer;
    private AutoResetEvent? _autoResetEvent;
    private Action? _action;

    public DateTime TimerStarted { get; set; }
    public bool IsTimerStarted { get; set; }

    public void PrepareTimer(Action action)
    {
        _action = action;
        _autoResetEvent = new AutoResetEvent(false);

        // The timer will make a one-second pause before the first execution.
        _timer = new Timer(Excute, _autoResetEvent, 1000, 2000);
        TimerStarted = DateTime.Now;
        IsTimerStarted = true;
    }

    public void Excute(object? stateInfo)
    {
        _action();

        // auto stop/dispose timer after 60 seconds since the start
        if ((DateTime.Now - TimerStarted).TotalSeconds > 60)
        {
            StopTimer();
        }
    }

    public void PrepareManualTimer(Action action)
    {
        _autoResetEvent = new AutoResetEvent(false);

        // The timer will make a one-second pause before the first execution.
        _timer = new Timer(s => action(), _autoResetEvent, 1000, 2000);
        TimerStarted = DateTime.Now;
        IsTimerStarted = true;
    }

    public void StopTimer()
    {
        IsTimerStarted = false;
        _timer?.Dispose();
    }
}