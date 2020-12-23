import React, { Component } from "react";
import "./styles.css";

import ScanditBarcodeScanner from "scandit-sdk-react";
import { Barcode, ScanSettings } from "scandit-sdk";

class App extends Component {
  constructor(props) {
    super(props);
    this.licenseKey =
      "AT2fsQz2EyiFNnXuMQPqy35Bril4JNi+B06qyS8EXW0hQ/zjKHqUbmMe3wfGaUvgrkyj8u1kTQ4CGVscVDbbrKtyAVosXz0NtndTaMBvMUcQcl4/qAfhWb8VD7KvGF/W5zCXeIaTeZ87DM+2KznodhwW0hL5o2Ylmf2jdbYp82FfNk5mWH5P27V8EZgEXxI7izzkSAG+l14MFwoXKgZmwrokS52owOisUMsyJ0TgC7t5wRmeHr5ZM354u0e2lMwlOUQEBitDcxNpqSI7MCU6wnRYriLfOTyYrITuvdMS1kWSe97OcuNVZ0/ffoVmhEsUjvbfoIa1CQKKVW0YTpl9tsk7wHwoS6UUgYopjPvYjDy/346KYHAOgmO50ZhpFE9Uh1MLpcVPGX+tyMt2atD92bIfxoLt21GSDkdA3vbdmbXZNmhZbT96ZvcobV7iMcK9HtEAkLmqomwNjAfeH6LJfjp1X6us391UlpmRRFRErqCwx8fyCVS89GXW7FmRmFrxAGucRgVfYdKgJY77phXAc8Uq7PrUZGecKs7nL4pXviqqrnVXauYfSF/QPE8fW3daj01m3uFY7L2rkkEe8TZVMptwg5rEAPlrmM4oatOchOX13ZblgEQM4A1UwyEWe0ycD+mE3WsxBR+DZs0xXiqFgvXqjSrizQ7Lle7qFD+AT4AnRJpETC9uJUnNz+sXg4XrTE9IjqWe2CNGP2wjeHYcaVbxv4JDuIzCT3rliYPRBtSE+jb+dPHGAqUqnJqJ0T8H4tL9A98Or8PsAkTb+KKmT4osHJj51vvRH+diunqxeoPPCrly";
  }
  state = {
    barCodeList: [],
    isDone: false
  };

  addBarCodeHandler = (barCode) => {
    this.setState((state) => {
      const list = state.barCodeList.concat(barCode);
      return {
        barCodeList: list
      };
    });
  };
  clearRecordsHandler = () => {
    this.setState({
      barCodeList: []
    });
  };

  doneBtnHandler = () => {
    this.setState((state) => {
      return {
        isDone: !state.isDone
      };
    });
  };
  classes = [];
  render() {
    if (this.state.isDone) {
      this.classes = ["cameraOutput", "hideVideo"];
    } else {
      this.classes = ["cameraOutput"];
    }
    return (
      <div className="App">
        <div className={this.classes.join("")}>
          {this.state.isDone ? null : (
            <ScanditBarcodeScanner
              licenseKey={this.licenseKey}
              laserArea={{ x: 0, y: 0, width: 1, height: 0.4 }}
              vibrateOnScan={true}
              scanSettings={
                new ScanSettings({
                  enabledSymbologies: [
                    "qr",
                    "ean8",
                    "ean13",
                    "upca",
                    "upce",
                    "code128",
                    "code39",
                    "code93",
                    "itf"
                  ],
                  codeDuplicateFilter: -1
                })
              }
              playSoundOnScan={true}
              engineLocation="https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build"
              onReady={() => this.setState({ scannerReady: true })}
              onScan={(scanResult) => {
                let barCode = scanResult.barcodes.reduce(function (
                  string,
                  barcode
                ) {
                  return (
                    string +
                    Barcode.Symbology.toHumanizedName(barcode.symbology) +
                    ": " +
                    barcode.data
                  );
                },
                "");
                this.addBarCodeHandler(barCode);
              }}
            />
          )}
        </div>
        <div className="resultList">
          {this.state.barCodeList
            .slice(0)
            .reverse()
            .map((item) => {
              return <p key={item}>{item}</p>;
            })}
        </div>
        <div className="bottomControls">
          <button onClick={this.clearRecordsHandler}>CLEAR</button>
          <button onClick={this.doneBtnHandler}>DONE</button>
        </div>
      </div>
    );
  }
}

export default App;
