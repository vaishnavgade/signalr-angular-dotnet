using Realtime.Server.Models;

namespace Realtime.Server.DataStorage;

public class DataManager
{
    public static RealtimeModel GetData()
    {
        var r = new Random();
        return new RealtimeModel
        {
            RealtimeNumber = r.Next(1, 40)
        };
    }
}