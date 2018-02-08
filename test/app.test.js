import Vue from 'vue'
import Hello from '../src/components/Hello'
describe('App.test.js', () => {
    // var cmp = Vue.extend(pageTitle); // Create a copy of the original component
    it('Data Collection should be an array', () => {
        expect(Hello.name).toBe('hello');
    })
});