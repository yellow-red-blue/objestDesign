const checkStaries = {
  isPhone( telephone, errMsg ) {
    const phoneRegx = /^1\d{10}$/
    if ( !phoneRegx.test( telephone ) ) {
      console.log( 2 )
      console.log( errMsg )
      return errMsg
    } else {
      return 9
    }
  },
  isMaxLength( value, length, errMsg ) {
    if ( value.length && value.length > length ) {
      return errMsg
    }
  },
  isMinLength( value, length, errMsg ) {
    if ( value.length && value.length < length ) {
      return errMsg
    }
  },
  isEqualLength( value, length, errMsg ) {
    if ( value.length && value.length !== length ) {
      return errMsg
    }
  }
}

// example 
// valie.add('isMinLength: 6', value, errMsg)
class Valie {
  constructor() {
    this.cache = []
  }
  add( checkType, value ) {
    const that = this
    for ( let i = 0; i < checkType.length; i++ ) {
      let item = checkType[ i ]
      const arg = item.checkType.split( ':' )
      const type = arg.shift()
      arg.unshift( value )
      arg.push( item.errMsg )
      console.log( 999 )
      this.cache.push(
        function() {
          return checkStaries[ type ].apply( this, arg )
        }

      )
    }

  }
  start() {
    let errMsg
    for ( let i = 0; i < this.cache.length; i++ ) {
      const fn = this.cache[ i ]
      console.log( fn )
      errMsg = fn()
      console.log( errMsg )
    }
    return errMsg
  }
}

let t = new Valie()
t.add( [ {
  checkType: 'isPhone',
  errMsg: '请输入正确的手机号'
} ], 1762106560 )
const s = t.start()
console.log( t )
console.log( s )