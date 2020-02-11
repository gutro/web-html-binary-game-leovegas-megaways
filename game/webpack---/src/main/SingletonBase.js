/**
 * @fileoverview
 * This is the singleton base constructor for any class using singleton partten. 

 * To make a class into singleton class by this contructor, change return value of
 * original constructor to:

 * 
 *   function A() {
 *    //constructor code
 *    //...
 *
 *    return SingletonBase.call(this);
 *   }
 * 

 *
 * to get a reference of singleton class A, create new instance by:

 *   var a = new A() 

 * or use reference on constructor: 

 *   var a = A.instance
 *
 * @author xliu
 * Date: 07/05/13
 */
//goog.provide('gcm.SingletonBase');

/**
 * @this {*} this pointer should be point to a reference of a singleton class instance.
 * This function is used only in singleton class constructor.
 * @return {*} The singleton instance of given class.
 * */
export function SingletonBase() {
  if (!this.constructor.instance)
    this.constructor.instance = this;
  return this.constructor.instance;
}


// WEBPACK FOOTER //
// ./src/main/SingletonBase.js