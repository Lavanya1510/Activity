import React, { Component } from 'react'
import {Row,Col,message,Card, Empty,Button,Select,Icon,Modal,DatePicker,Input } from 'antd'
import { Table  } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;
export class MainPage extends Component {
    state={
        visible:false,
        startdate:'',
        enddate:'',
        activity:'',
        notes:'',
        actArray:[],
        pinindex:null,
        seachany:false,
        searchact:[]
    }
    componentDidMount=async()=>{
        let getAct=JSON.parse(localStorage.getItem('avt'))
        if(getAct != undefined && getAct != null){
            await this.setState({actArray:getAct})
        }
    }
    
    activity=async()=>{
        await this.setState({visible:true})
    } 

    handleOk = async() => {
        let {activity,notes,startdate,enddate} = this.state
        if(activity != ''){
            if(startdate != '' || enddate != ''){
                let actArray=this.state.actArray
                let obj={
                    activity:activity,
                    note:notes,
                    startdate:startdate,
                    enddate:enddate,
                    pinned:false
                }
                console.log('objj',obj)
                actArray.push(obj)
                console.log('actArray',actArray)
                localStorage.setItem('avt',JSON.stringify(actArray))
                await this.setState({
                    visible: false,actArray, startdate:'',
                    enddate:'',
                    activity:'',
                    notes:''
                });
            }else{
                message.error('Please Select date')
            }
        }else{
            message.error('Please enter activity')
        }
      };
    
      handleCancel = async() => {
        await this.setState({
          visible: false, startdate:'',
          enddate:'',
          activity:'',
          notes:''
        });
      }

    //   onChange=async(date, dateString)=>{
    //     console.log(date, dateString)
    //     await this.setState({date:dateString})
    //   }
    onChangeDate=async(value,dateString)=>{
        console.log('Selected Time: ', value)
        console.log('Formatted Selected Time: ', dateString[0],dateString[1])
        await this.setState({startdate:dateString[0],enddate:dateString[1]})
    }
    onOkDate=async(value)=>{
        console.log('onOk: ', value)
    }

    delete=async(item,i)=>{
        console.log('delete',item)
        let getAct=JSON.parse(localStorage.getItem('avt'))
        if(getAct != undefined && getAct != null){
            getAct.splice(i,1)
            localStorage.setItem('avt',JSON.stringify(getAct))
            await this.setState({actArray:getAct})
        }
    }
    pinitem=async(item,i)=>{
        console.log('delete',item)
        await this.setState({pinindex:i})
        let getAct=JSON.parse(localStorage.getItem('avt'))
        if(getAct != undefined && getAct != null){
            console.log('getAct[i]',getAct[i])
            getAct[i]={
                activity:item.activity,
                note:item.note,
                startdate:item.startdate,
                enddate:item.enddate,
                pinned:true
            }
            console.log('obj',getAct[i])
            console.log('array',getAct)
            localStorage.setItem('avt',JSON.stringify(getAct))
        }

    }
    selectSearch=(item)=>{
        console.log(item)
    }
    handleChange=async(item)=>{
        console.log('hand',item,item[0])
        let obj=this.state.actArray
        let filteredObj=obj.filter(p=>p.activity == item[0])
        console.log('filteredObj',filteredObj)
        await this.setState({actArray:filteredObj})
    }
    logout=()=>{
        confirmAlert({
            message: 'Are you sure do you want to logout',
            buttons: [
              {
                label: 'Yes',
                onClick: () =>{
                     localStorage.clear()
                     window.location.href='/LoginPage'
                }
              },
              {
                label: 'No'
              }
            ]
          });
        
    }
    render() {

        return (
            <div style={{height:'100%',width:'100%'}}>
                <Row style={{backgroundColor:'#fff',boxShadow:'0 2px 3px rgba(0,0,0,.2)',height:'20%',padding:'10px 5%'}}>
                    <Col span={2} style={{fontSize:'16px',fontWeight:'600'}}>LoginPage</Col>
                    <Col span={12}>
                    <Select 
                                            mode="tags" 
                                            showSearch
                                            //    value={this.state.searchv}
                                            placeholder='Search activities here ...'
                                            style={this.props.style}
                                            defaultActiveFirstOption={false}
                                            showArrow={false}
                                            filterOption={false}
                                            onSearch={this.handleSearch}
                                            notFoundContent={null}
                                            placeholder='What are you looking for ? '
                                            style={{ width: '80%' }}
                                            onChange={this.handleChange}
                                            //    onMouseLeave={this.searchhide}
                                            
                                    >
                                        {this.state.actArray.map((p,i)=>{return(
                                            <Option key={p.activity}>
                                                <div style={{color:'black'}}>
                                                    <a style={{textDecoration:'none'}} 
                                                       onClick={e=>this.selectSearch(p)}>{p.activity}</a>
                                               </div>
                                           </Option>
                                        )})}
                                    </Select>
                    </Col>
                    <Col span={10} style={{}}>
                        <Row>
                            <Col span={1} style={{float:'right'}}>
                                  {/* <Icon type='down' style={{fontSize:'12px'}}></Icon> */}
                                  <text style={{cursor:'pointer'}} onClick={this.logout}>Logout</text>
                            </Col>
                            <Col span={1} style={{float:'right'}}>
                                <Icon type='user' style={{fontSize:'24px'}}></Icon>

                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{padding:'15px 5%'}}>
                    <div style={{width:'100%'}}>
                          <div style={{fontSize:'20px',fontWeight:'600',float:'left'}}>Your Activities</div>
                          <div style={{float:'right'}}>
                              <button style={{height:'30px',width:'auto',backgroundColor:'#483D8B',color:'white',border:'none',fontSize:'16px',fontWeight:'600',padding:'5px 10px',display:'flex',alignItems:'center',justifyContent:'center'}}
                                        onClick={this.activity}>
                                    Your Activities
                              </button>
                              <Modal
                                title="Add Your Activities"
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                >
                                <div>
                                    <div>
                                        {/* <DatePicker onChange={this.onChange} style={{width:'100%'}}/> */}
                                        {/* <RangePicker onChange={this.onChange} style={{width:'100%'}}/> */}
                                        <RangePicker
                                            showTime={{ format: 'HH:mm' }}
                                            format="YYYY-MM-DD HH:mm"
                                            placeholder={['Start Time*', 'End Time*']}
                                            onChange={this.onChangeDate}
                                            onOk={this.onOkDate}
                                            style={{width:'100%'}}
                                        />
                                    </div>
                                    <div style={{paddingTop:'5%'}}>
                                       <Input type='text' placeholder="Add Activity*" 
                                            //    style={{lineHeight: 'normal', border: '1px solid #eee',borderBottom: '1px solid #bebfc5',  outline: 0,  height: '42px', width: '100%', fontSize: '15px', margin: 0,padding: '5px'}}
                                               value={this.state.activity}
                                               // disabled={!this.state.password}
                                               onChange={e=>this.setState({activity:e.target.value})}>
                                        </Input>
                                    </div>
                                    <div style={{paddingTop:'5%'}}>
                                       {/* <input type='text' placeholder="Add Notes" 
                                               style={{lineHeight: 'normal', border: '1px solid #eee',borderBottom: '1px solid #bebfc5',  outline: 0,  height: '100px', width: '100%', fontSize: '15px', margin: 0,padding: '5px'}}
                                               value={this.state.notes}
                                               onChange={e=>this.setState({notes:e.target.value})}>
                                        </input> */}
                                        <TextArea rows={4}
                                        placeholder="Add Notes"
                                        value={this.state.notes}
                                                  onChange={e=>this.setState({notes:e.target.value})}/>
                                    </div>
                                </div>
                            </Modal>
                          </div>
                    </div>
                </Row>
                <Row style={{padding:'10px 5%'}}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Activities</th>
                        <th>Notes</th>
                        <th></th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.actArray.map((p,i)=>{return(
                            <tr  key={i}>
                                <td>{i+1}</td>
                                <td>{p.startdate}</td>
                                <td>{p.enddate}</td>
                                <td>{p.activity}</td>
                                <td>{p.note}</td>
                                <td>
                                    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                         <Icon type='star' theme={this.state.pinindex == i || p.pinned?"filled":''} onClick={e=>this.pinitem(p,i)}/>
                                    </div>
                                    </td>
                                <td><text style={{color:'red',cursor:'pointer'}} onClick={e=>this.delete(p,i)}>delete</text></td>
                            </tr>
                        )})}
                    </tbody>
                    </Table>
                </Row>
            </div>
        )
    }
}

export default MainPage
