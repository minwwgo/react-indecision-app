import React from 'react';
import AddOptions from './AddOptions';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component{
    state={
        options:[ ],
        selectedOption:undefined
    }
   
    handlePick=()=>{
        const randomNum=Math.floor (Math.random() * this.state.options.length)
        const option =this.state.options[randomNum];
        this.setState(()=>({
            selectedOption:option
        }));
    }
    handleDeleteSelectedOption=()=>{
        this.setState(()=>({ selectedOption:undefined}))
    }
    handleDeleteOptions=()=>{

       this.setState(()=>( { options:[ ] } ) );
    }
    handleAddOptions=(option)=>{
        if(!option){
            return ' enter valid value';
        } else if (this.state.options.indexOf(option)>-1){
            return ' option already exists ';
        }
        this.setState((prevState)=>({ options: prevState.options.concat(option)}))
    }
    handleDeleteOption=(optionToRemove)=>{
        this.setState((prevState)=>({
            options:prevState.options.filter((option)=>{
                return optionToRemove !== option
            })
        }))
    }
    componentDidMount(){
        try{
            const json = localStorage.getItem('options')
             const options= JSON.parse(json )
        this.setState(()=>({options}))

        }catch(e){
            // do nothing
        }
        
    }
    componentDidUpdate(prevProps,prevState){
        if( prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json )

        }
    }
   
    
    
    
    render(){
        const subtitle='Let Computer Make Choice';
        
       

        return (

            <div>
                <Header subtitle={subtitle}/>
                
                <div className='container'>
                    <Action 
                    handlePick={this.handlePick}
                    hasOption={this.state.options.length>0}/>

                    <div className='widget'>
                        <Options 
                        options={this.state.options}
                        handleDeleteOptions={this.handleDeleteOptions}
                        handleDeleteOption={this.handleDeleteOption}/>

                        <AddOptions
                        handleAddOptions={this.handleAddOptions}/>
                    </div>

                    
                </div>
                

                <OptionModal
                selectedOption={this.state.selectedOption}
                handleDeleteSelectedOption={this.handleDeleteSelectedOption}/>
            </div>
        )
    }

}
