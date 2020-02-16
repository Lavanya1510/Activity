import React, { Component } from 'react'
import {Row,Col,message,Card, Empty,Button} from 'antd'
export class LoginPage extends Component {
    state={
        email:'',
        password:'',
        dub:[
            {
                dubemail:'asha@gmail.com',
                dubpass:'asha'
            },
            {
                dubemail:'lavanya@gmail.com',
                dubpass:'lavanya'
            }
        ],
    }
    componentDidMount=async()=>{
        await this.setState({email:'',password:''})
    }
    // componentDidMount(){
    //     let url="http://localhost:3000/posts";
    //     fetch(url)
    //     .then(resp=>resp.json())
    //     .then(data=>{
    //         console.log('data',data)
    //         let posts=data.map((post,index)=>{
    //             return(
    //                 <div key={index}>
    //                 <h3>{post.title}</h3>
    //                 <p>Tags: {post.tags}</p>
    //                 </div>
    //             )
    //         })
    //         console.log('postt',posts)
    //         this.setState({posts: posts});
    //     })
    // }
    submitform=async()=>{
        console.log('sdjsjhdf')
        let {email,password,dubemail,dubpass,dub} = this.state
        let check=false
        for(let i=0;i<dub.length;i++){
            if(email == dub[i].dubemail && password == dub[i].dubpass){
                check=true
            }
        }
        if(check == true){
            console.log('trueee')
            localStorage.setItem('id',987)
            window.location.href='/'
        }else{
            message.error('Please check your email and password')
        }
    }
    render() {
        return (
            <div style={{height:'100%',width:'100%'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'10%'}}>
                        <Card style={{width:'30%',backgroundColor:'#fff',padding:'5px'}}>
                            <div style={{fontSize:'16px',fontWeight:'600'}}>SIGN IN</div>
                            <div style={{paddingTop:'5%'}}>
                                        {/* <label style={{fontWeight:'600',position: 'absolute',fontSize:'12px'}}>Email</label>  */}
                                        <input type='email' placeholder="Enter your email" 
                                               style={{backgroundColor: 'transparent',lineHeight: 'normal', border: 'none', borderBottom: '1px solid #bebfc5',  outline: 0,  height: '42px', width: '100%', fontSize: '15px', margin: 0,padding: 0}}
                                               value={this.state.email}
                                               // disabled={!this.state.email}
                                               onChange={e=>this.setState({email:e.target.value})}>
                                        </input>
                            </div>
                            <div style={{paddingTop:'5%'}}>
                                        <input type='password' placeholder="Enter your password" 
                                               style={{backgroundColor: 'transparent',lineHeight: 'normal', border: 'none', borderBottom: '1px solid #bebfc5',  outline: 0,  height: '42px', width: '100%', fontSize: '15px', margin: 0,padding: 0}}
                                               value={this.state.password}
                                               // disabled={!this.state.password}
                                               onChange={e=>this.setState({password:e.target.value})}>
                                        </input>
                            </div>
                            <div style={{paddingTop:'8%'}}>
                                <button style={{height:'30px',width:'100%',backgroundColor:'#483D8B',color:'white',border:'none',fontSize:'16px',fontWeight:'600'}}
                                        onClick={this.submitform}>
                                    Login
                                </button>
                            </div>
                        </Card>
                </div>
            </div>
        )
    }
}

export default LoginPage
