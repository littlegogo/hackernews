import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
    {
        title: 'React',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://github.com/reactjs/redux',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
];

// 用于过滤列表的高阶函数
const isSearched = searchTerm => item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {

    // 组件的构造函数
    constructor(props) {
        super(props);

        // 设置初始状态
        this.state = {
            list,
            searchTerm: '',
        };

        // 绑定方法
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }


    render() {
        const { searchTerm, list } = this.state;
        return (
            <div className="App">
                <div>
                    <Search
                        value={searchTerm}
                        onChange={this.onSearchChange}
                    />
                    <Table
                        list={list}
                        pattern={searchTerm}
                        onDismiss={this.onDismiss}
                    />
                </div>
            </div>
        );
    }
    onDismiss(id) {
        const isNotId = item => item.objectID !== id;
        const updatedlist = this.state.list.filter(isNotId);
        this.setState({ list: updatedlist });
    }

    // event 为 react的合成事件
    onSearchChange(event) {
        // 通过event访问搜索框的值
        this.setState({ searchTerm: event.target.value });
    }

}

class Search extends Component {
    constructor(props){
        super(props);
    }

     render() {
        const { value, onChange } = this.props;
        return (
            <form>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                />
            </form>
        );
    }
}

class Table extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const { list, pattern, onDismiss } = this.props;
        return (
            <div>
                {list.filter(isSearched(pattern)).map(item =>
                    <div key={item.objectID}>
                        <span>
                            <a href={item.url}>{item.title}</a>
                        </span>
                        <span>{item.author}</span>
                        <span>{item.num_comments}</span>
                        <span>{item.points}</span>
                        <span>
                            <button
                                onClick={() => onDismiss(item.objectID)}
                                type="button"
                            >
                                Dismiss
                            </button>
                        </span>
                    </div>
                )}
            </div>
        );
    }
}

export default App;
