import React from 'react';
import ReactDOM from 'react-dom';
class Aa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,id:null,
            update:null,
            errmsg:null
        }
       // this.handleclick=this.handleclick.bind(this)
    }

    componentWillMount = () => {        //// fetching data from database
        console.log("start");
        fetch('http://127.0.0.1:3002')
            .then( (response)=> {
                return response.json();
            })
            .then( (myJson) =>{
                console.log("getting data from db", myJson);
                this.setState({ data: myJson });
                this.setState({id:null})
                // console.log(this.state.data.length);
            });

        console.log('hi')
    }

     
    
    render() {
        //console.log("invoked")
        //console.log(this.state.data);
        //console.log("condition:",this.state.data)
        return (
            this.state.data ?
                <div> {this.load()} </div>
                 : <div> 'loading.....'</div>   
        )
    }
    
    
    load(){
        return( <div className="container">
             <h2 className="text-info">UsersData</h2>
             <br/>
             <div className="row">
                 <div className="col s12 board">
                     <table id="simple-board" className="table table-bordered">
                         <tbody>
                             <tr className="success">
                                 <th>Name&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                 <th>Email&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                 <th>Mobile No&nbsp;&nbsp;&nbsp;&nbsp;:</th>
                             </tr>
                             {this.show()}
                         </tbody>
                     </table>
                     <br/>
                     <br/>
                     <label className="text-danger">{this.state.errmsge2}</label>
                 </div>
             </div>
             <div><br /><br /><br /><br />
                 <form onSubmit={e => this.create(e)}>
                 <h2 className="text-info">Add new </h2>
                 <br/>
                     <label>
                         firstName&nbsp;:
                 <input type="text" name="fn" defaultValue={this.state.fn} onChange={e => this.setState({fn: e.target.value })} />
                     </label>
                     <label>
                          LastName :
                 <input type="text" name="ln" defaultValue={this.state.ln} onChange={e => this.setState({ ln: e.target.value })} />
                     </label>
                     <br />
                     <label>
                         Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                 <input type="email" name="em" defaultValue={this.state.em} onChange={e => this.setState({ em: e.target.value })} />
                     </label>
                     <br />
                     <label>
                         Mobile No:
                 <input type="number" name="mb" defaultValue={this.state.mb} onChange={e => this.setState({ mb: e.target.value })} />
                     </label><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     <input type="submit" class="btn btn-info" value="Submit" />&nbsp;&nbsp;
                     <button type="reset" class="btn btn-success" value="Reset" onClick={ev=> this.reset()}>Reset</button>
                     <br/>
                     <br/>
                     <label className="text-danger">{this.state.errmsg}</label>
                 </form>
                 
             </div>
         </div>
        )};
    show = () => {
        let rows = [];
        
        let len = this.state.data.length;
        console.log('length', len);
        console.log(this.state.id);
        this.state.data.map((item, index) => {
           
            if(this.state.id !== index){
            //console.log('item', item)
            let rowID = `row${index}`
            let cell = [];
            let cellID = `cell${index}0`
            let butID=`but${index}`
            cell.push(<td key={cellID} id={cellID}>{item.Name} &nbsp;&nbsp;&nbsp;&nbsp;</td>)
            cellID = `cell${index}1`
            cell.push(<td key={cellID} id={cellID}>{item.Email}&nbsp;&nbsp;&nbsp;&nbsp;</td>)
            cellID = `cell${index}2`
            cell.push(<td key={cellID} id={cellID}>{item.Mobile}&nbsp;&nbsp;&nbsp;&nbsp;</td>)
            cell.push(<td width="25%" id={butID}   ><button onClick={ev=> this.handleclick(ev,index)} type="button" className="btn btn-primary">Edit</button></td>)
            rows.push(<tr key={index} id={rowID}>{cell}</tr>)
            }
            else
            {
                let rowID = `row${index}`
                let cell = [];
                let cellID = `cell${index}0`
                let butID=`but${index}`
                cell.push(<td key={cellID} id={cellID}><input type="text" name="name" defaultValue={this.state.name} onChange={e => this.setState({name: e.target.value })} /></td>)
                cellID = `cell${index}1`
                cell.push(<td key={cellID} id={cellID}><input type="email" name="name" defaultValue={this.state.email} onChange={e => this.setState({email: e.target.value })} /></td>)
                cellID = `cell${index}2`
                cell.push(<td key={cellID} id={cellID}><input type="number" name="name" defaultValue={this.state.mobile} onChange={e => this.setState({mobile: e.target.value })} /></td>)
                cell.push(<td width="25%" id={butID} key={butID}><button onClick={ev=> this.update(ev,index)} type="button" className="btn btn-primary" >Update</button>&nbsp;&nbsp;
                <button  type="button" class="btn btn-danger" data-toggle="modal" data-target="#myModal">Delete</button></td>)
                rows.push(<tr key={index} id={rowID}>{cell}</tr>)       
            }
            rows.push(
                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                    <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                    <label>You want to delete the selected item?.</label>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-success" data-dismiss="modal" onClick={ev=> this.delete(ev,index)}>Confirm</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
                </div>
            </div>
            )
        })
        return rows        
    }
    
   

    handleclick(ev,id)
    {
        console.log("event occured on:"+id);
        console.log(this.state.data);
        this.setState({id:id})
        this.setState({name:this.state.data[id].Name});
        this.setState({email:this.state.data[id].Email});
        this.setState({mobile:this.state.data[id].Mobile});
    }

    reset=()=>{
        this.setState({fn:null});
        this.setState({ln:null});
        this.setState({em:null});
        this.setState({mb:null});
        this.setState({id:null});
        this.setState({errmsg:null});
        this.setState({errmsge2:null});
    }

    create = (e) => {
        // var that = this;
         e.preventDefault() 
         console.log('data',this.state.fn);
         var newdata={fn:this.state.fn,ln:this.state.ln,em:this.state.em,mb:this.state.mb};
         fetch('http://127.0.0.1:3002/insert', {
             body: JSON.stringify(newdata),
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
             },
             method: 'POST'
         }).then((response)=> {
             return response.json();
         }).then((myJson)=> {
                 console.log(myJson);
                 if(myJson.mssg ==="inserted")
                 {
                     //that.setState({ data: myJson });
                     this.setState({fn:null});
                     this.setState({ln:null});
                     this.setState({em:null});
                     this.setState({mb:null});
                     this.setState({data:null});
                     this.setState({errmsg:null});
                     this.setState({errmsge2:null});
                     console.log("data inserted");
                     this.componentWillMount();
                 }
                 else
                 {
                     this.setState({errmsg:myJson.mssg});
                 }
             });
     }

    update(ev,ind)
    {
        console.log("will update:"+ind);
        var updatedata={id:ind,name:this.state.name,email:this.state.email,mobile:this.state.mobile};
        console.log(updatedata)
        fetch('http://127.0.0.1:3002/update', {
            body: JSON.stringify(updatedata),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'PUT'
        }).then((response)=> {
            return response.json();
        }).then((myJson)=> {
                console.log(myJson);
                //that.setState({ data: myJson });
                if(myJson.mssg ==="updated")
                {
                    this.setState({name:null});
                    this.setState({email:null});
                    this.setState({mobile:null});
                    this.setState({errmsge2:null});
                    this.setState({id:null});
                    alert("Upadated successfully");
                    this.componentWillMount();
                }
                else
                {
                    alert(myJson.mssg)
                   // this.setState({errmsge2:myJson.mssg});
                }
            });
    }

    delete(ev,ind)
    {
       //console.log("alert:",confirm("Press ok to delete"));
       
        console.log("will remove:"+ind);
        fetch('http://127.0.0.1:3002/delete', {
            body: JSON.stringify({id:ind}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'DELETE'
        }).then((response)=> {
            return response.json();
        }).then((myJson)=> {
                console.log(myJson);
                this.componentWillMount();
            });
    }
}
ReactDOM.render(<Aa />, document.getElementById('root'));