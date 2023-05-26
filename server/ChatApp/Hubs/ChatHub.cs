using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatApp.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IDictionary<string, UserConnection> _connections;

        public ChatHub(IDictionary<string, UserConnection> connections)
        {
            _connections = connections;
        }


        public async Task SendMessage(string message, string time)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Group(userConnection.Room)
                    .SendAsync("ReceiveMessage", userConnection.User, message, time);
            }
        }

        public async Task JoinRoom(UserConnection userConnection)
        {
            // ovaj userConnextion gore je dictionary, ali u mom slucaju moze da bude samo string - roomId
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

            _connections[Context.ConnectionId] = userConnection;
            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage",  $"{userConnection.User} has joined {userConnection.Room}");

            await SendUsersConnected(userConnection.Room);

        }

        public async Task LeaveRoom(UserConnection userConnection)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, userConnection.Room);
            _connections.Remove(Context.ConnectionId);
            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", $"{userConnection.User} has left {userConnection.Room}");


        }



        public override Task OnDisconnectedAsync(Exception exception)
        {
            if(_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                _connections.Remove(Context.ConnectionId);
            }

            return base.OnDisconnectedAsync(exception);
        }

        public Task SendUsersConnected(string room)
        {
            var users = _connections.Values
                .Where(c => c.Room == room)
                .Select(c => c.User);

            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }
    }
}
