import React from "react";
import {render} from "react-dom";
import data from "../mockdata/menu-data.json";
import Menu from "./Menu/Menu.js";
import "./css/main.scss";

console.log(data);

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            menu: data
        }
    }

    render() {
        let menuItems = [];

        let title = (
        <div key ="title" className="App">
            <h1>Menu List</h1>
        </div>
        );  
       menuItems.push(title);

       let subTitle = (
       <div key ="title1" className="App">
            <h3>Starters</h3>
       </div>
       );  
       menuItems.push(subTitle);

        for (let i = 0, l = this.state.menu.starters.length; i < l; ++i) {
            menuItems.push(
                <Menu course={this.state.menu.starters[i].name}
                      price={this.state.menu.starters[i].price}
                      key={"starters-" + i.toString()}>
                </Menu>
            )
        }

        subTitle = (
            <div key ="title2" className="App">
                 <h3>Mains</h3>
            </div>
            );  
            menuItems.push(subTitle);

        for (let i = 0, l = this.state.menu.mains.length; i < l; ++i) {
            menuItems.push(
                <Menu course={this.state.menu.mains[i].name}
                      price={this.state.menu.mains[i].price}
                      key={"mains-" + i.toString()}>
                </Menu>
            )
        }

        subTitle = (
            <div key ="title3" className="App">
                 <h3>Desserts</h3>
            </div>
            );  
            menuItems.push(subTitle);

        for (let i = 0, l = this.state.menu.desserts.length; i < l; ++i) {
            menuItems.push(
                <Menu course={this.state.menu.desserts[i].name}
                      price={this.state.menu.desserts[i].price}
                      key={"desserts-" + i.toString()}>
                </Menu>
            )
        }
      
        return menuItems
    }
}

render(<App />, document.getElementById("root"));