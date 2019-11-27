import { notification } from "antd";

class connect {
  ws = null;
  timeout = 250;
  // Initial timeout duration as a class variable
  notify = (type, title, key) => {
    notification[type]({
      key: key,
      message: title
    });
  };

  connect = () => {
    this.ws = new WebSocket("ws://9ec161e9.ngrok.io/sockethandler/1/");
    let that = this;
    var connectInterval;
    this.ws.onopen = () => {
      console.log("connected websocket main component");
      this.notify("success", "You are Connected", "connect");
      that.timeout = 250;
      clearTimeout(connectInterval);
    };
    this.ws.onmessage = event => {
      let data = JSON.parse(event.data);
      console.log(data);
      //   this.notify("success", "simulation complete");
      this.notify(
        data.status === "success" ? "success" : "error",
        data["message"]
      );
    };
    this.ws.onclose = e => {
      console.log(
        `Socket is closed. Reconnect will be attempted in ${Math.min(
          10000 / 1000,
          (that.timeout + that.timeout) / 1000
        )} second.`,
        e.reason
      );
      this.notify(
        "warning",
        `Your Are Disconnected. Reconnect will be attempted in ${Math.min(
          10000 / 1000,
          (that.timeout + that.timeout) / 1000
        )} second.`,
        "closed"
      );

      that.timeout = that.timeout + that.timeout;
      connectInterval = setTimeout(this.check, Math.min(10000, that.timeout));
    };

    this.ws.onerror = err => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );
      this.notify("error", "Server encountered error", "error");
      this.ws.close();
    };
  };
  check = () => {
    if (!this.ws || this.ws.readyState == WebSocket.CLOSED) this.connect();
  };
}

export default new connect();
