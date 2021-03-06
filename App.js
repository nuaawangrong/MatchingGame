import React, { Component } from 'react'

import {
  View,
  Text,
  StatusBar,//设置导航栏相关
  SafeAreaView,//防止刘海屏显示不完整
  StyleSheet,//用于样式调整，类似于CSS
  TouchableOpacity,//按钮组件，点击后透明度降低
  Dimensions,//本模块用于获取设备屏幕的宽高。
} from 'react-native'

import Card from './Card'

export default class App extends Component {

  state = {
    cardSymbols: [
      // '😂','😊','🤣','😍','😒','😘','😁','😉',
      '🍓','🥥','🥝','🍐','🍒','🍎','🍉','🍇',
      // '♈','♉','♊','♋','♌','♍','♎','♏',
    ],
    cardSymbolsInRand: [],
    isOpen: [],

    firstPickedIndex: null,
    secondPickedIndex: null,
    steps: 0,
    isEnded: false,

  }

  initGame = () => {
    let newCardSymbols = [...this.state.cardSymbols, ...this.state.cardSymbols]
    let cardSymbolsInRand = this.shuffleArray(newCardSymbols)

    let isOpen = []
    for (let i = 0; i < newCardSymbols.length; i++) {
      isOpen.push(false)
    }


    this.setState({
      cardSymbolsInRand,
      isOpen,
    })
  }

  componentDidMount() {
    this.initGame()

  }

  shuffleArray = (arr) => {
    //打乱数组中的元素位置
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]]
    }
    return newArr
  }

  cardPressHandler = (index) => {

    let isOpen = [...this.state.isOpen]

    if (isOpen[index]) return;
    
    isOpen[index] = true

    if (this.state.firstPickedIndex == null && this.state.secondPickedIndex == null) {
      //正在选择第一张卡片
      this.setState ({
        isOpen,
        firstPickedIndex: index,
      })
    } else if (this.state.firstPickedIndex != null && this.state.secondPickedIndex == null){
      //正在选择第二张卡片
      this.setState ({
        isOpen,
        secondPickedIndex: index,
      })
    }

    this.setState ({
      steps: this.state.steps + 1,
    })

  }

  calculateGameResult = () =>  {

    if (this.state.firstPickedIndex != null && this.state.secondPickedIndex != null) {

      if (this.state.cardSymbolsInRand.length > 0) {
        // let totalOpens = this.state.isOpen.filter(isOpen => {
        //   return isOpen === true
        // })
        let totalOpens = this.state.isOpen.filter(isOpen => isOpen)
        if ( totalOpens.length === this.state.cardSymbolsInRand.length) {
          this.setState ({
            isEnded: true,
          })
          return
        }
        
      }


      let firstSymbol = this.state.cardSymbolsInRand[this.state.firstPickedIndex]
      let secondSymbol = this.state.cardSymbolsInRand[this.state.secondPickedIndex]

      if(firstSymbol != secondSymbol ) {
        //不正确
        setTimeout(() => {
          let isOpen = [...this.state.isOpen] 
          isOpen[this.state.firstPickedIndex] = false
          isOpen[this.state.secondPickedIndex] = false

          this.setState ({
            firstPickedIndex: null,
            secondPickedIndex: null,
            isOpen,
          })

        }, 300);

      } else {
        //正确
        this.setState ({
          firstPickedIndex: null,
          secondPickedIndex: null,
        })

      }
    }
  }

  resetGame = () => {
    this.initGame()
    this.setState ({
      firstPickedIndex: null,
      secondPickedIndex: null,
      steps: 0,
      isEnded: false,
    })
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevState.secondPickedIndex != this.state.secondPickedIndex) {
      this.calculateGameResult()
    }
  }

  render () {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Matching Game</Text>
          </View>
          <View style={styles.main}>
            <View style={styles.gameBoard}>
              {/* <Card style={styles.button} fontSize={30} title="😂" cover="❓" isShow={true} />
              <Card style={styles.button} fontSize={30} title="😂" cover="❓" isShow={false} /> */}

              {this.state.cardSymbolsInRand.map((symbol, index) =>
                <Card 
                  key={index} 
                  // onPress={ () => console.log(`clikced ${index}`) }
                  onPress={ () => this.cardPressHandler(index) }
                  
                  style={styles.button} 
                  fontSize={30} 
                  title={symbol} 
                  cover="❓" 
                  isShow={this.state.isOpen[index]}
                  // isShow={true}
                />
                
              )}

              
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {
                this.state.isEnded
                ? `恭喜完成! 你一共点击了 ${this.state.steps} 次。`
                : `你一共点击了 ${this.state.steps} 次。`
              }
            </Text>
            {this.state.isEnded
              ?
              <TouchableOpacity 
                onPress = { this.resetGame }
                style={styles.tryAgainButton}
              >
                <Text style={styles.tryAgainButtonText}>再来一次</Text>
              </TouchableOpacity>
              :null
            }
          </View>
        </SafeAreaView> 
      </>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: "#eee",
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  main: {
    flex: 3,
    backgroundColor: "#fff",
  },
  gameBoard: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,//
    margin: (Dimensions.get('window').width - ( 48*4 ))  / ( 5*2 ) //Dimensions.get('window').width->获取屏幕设备的宽度
  },
  buttonText: {
    fontSize: 30,
    textAlign:'center',
  },
  footer: {
    flex: 1,
    backgroundColor: "#eee",
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 20,
    textAlign:'center',
  },
  tryAgainButton: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    marginTop: 20,

  },
  tryAgainButtonText: {
    fontSize: 18,

  },
})

