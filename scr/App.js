import React, { Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './compomentes/Button'
import Display from './compomentes/Display'

const initialSate = {
  displayValue : '0',
  claerDisplay: false,
  operation: null,
  values: [0,0],
  current: 0,
}

export default class App extends Component{

  state = {...initialSate }

  addDigit = n => {
    // if para impedir que outo . seja colocado na calculadora
   
    // validação para limpar o zero
    const claerDisplay = this.state.displayValue === '0' || this.state.claerDisplay
    if ( n === '.' && !claerDisplay && this.state.displayValue.includes('.')) {
      return
    }
    // limpar a valor anterios quando for zero 
    const currentValue = claerDisplay ? '' : this.state.displayValue
    // concatenar como string os numeros 
    const displayValue = currentValue + n
    // imprimir na tela do celular 
    this.setState({ displayValue, claerDisplay: false})

    if (n !== '.') {
      // logica para ocupar o vetor na posição que o numero é colocar é como se fosse um 'topo'
      const newValue = parseFloat(displayValue)
      // values esta clonado o vetor
      const values = [...this.state.values]
      // values esta ocupando o estapaço do vetor que esta sento usado 
      values[this.state.current] = newValue
      // salvando o resultado no state
      this.setState({ values })
    }

  }
  clearMemory = () =>{
    this.setState({...initialSate})
  }
  setOperation = operation => {
    if ( this.state.current === 0) {
      this.setState({ operation, current : 1, claerDisplay: true })

      
    }else{
      const equals = operation === '='
      const values = [...this.state.values]
      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
        /// catch para eviatr esrros tipos 25 = 2 
      } catch(e){
        values[0] = this.state.values[0]
      }
      values[1] = 0
      /// salvando as operações no state 
      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        claerDisplay: true,
        values,
      })

    }

  }

    render () {
      return (
        <View style={styles.container}>
          <Display value={ this.state.displayValue}/>
          <View style={styles.buttons}>
            <Button label ='AC' triple onClick={this.clearMemory}/>
            <Button label ='/' operation onClick={ this.setOperation}/>
            <Button label ='7' onClick={this.addDigit}/>
            <Button label ='8'  onClick={ this.addDigit}/>
            <Button label ='9'  onClick={ this.addDigit}/>
            <Button label ='*' operation onClick={ this.setOperation}/>
            <Button label ='4'  onClick={ this.addDigit}/>
            <Button label ='5'  onClick={ this.addDigit}/>
            <Button label ='6'  onClick={ this.addDigit}/>
            <Button label ='-' operation onClick={ this.setOperation}/>
            <Button label ='3'  onClick={ this.addDigit}/>
            <Button label ='2'  onClick={ this.addDigit}/>
            <Button label ='1'  onClick={ this.addDigit}/>
            <Button label ='+' operation onClick={ this.setOperation}/>
            <Button label ='0' double  onClick={ this.addDigit}/>
            <Button label ='.' onClick={ this.addDigit}/>
            <Button label ='=' operation onClick={ this.setOperation}/>
          </View>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  buttons:{
    flexDirection: 'row',
    flexWrap: 'wrap'
  }

});
