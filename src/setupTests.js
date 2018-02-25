import { JSDOM } from 'jsdom'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

global.dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>')
global.window = global.dom.window
global.document = global.window.document

