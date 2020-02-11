import {Promise} from "es6-promise";

class HtmlUtilities{

    constructor(){
        if(!HtmlUtilities.instance) {
            HtmlUtilities.instance = this;
        }

        return HtmlUtilities.instance;
    }

    addScript(scriptUrl){
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = scriptUrl;
            script.addEventListener('load', () => resolve(script), false);
            script.addEventListener('error', () => reject(script), false);
            document.body.appendChild(script);
        });
    }

    asyncAppendToBody(element){
        return new Promise((resolve, reject) => {
            try{
                document.body.appendChild(element);
                resolve();
            }catch(err){
                reject(err);
            }
        })
    }
}

const HtmlUtils = new HtmlUtilities();
export default HtmlUtils;


// WEBPACK FOOTER //
// ./src/main/utils/HTMLUtil.js