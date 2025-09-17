const {exec} = require('child_process')
const path = require('path')

const executeDart = (filepath)=>{
    
    return new Promise((resolve,reject)=>{

        const uniqueName = path.basename(filepath).split(".")[0];

        const wayName = path.join(__dirname,"../dart_runner")
        console.log("File Location:",wayName)
        exec(
            `cd ${wayName} && dart ${uniqueName}.dart`,
            (error,stdout,stderr)=>{
                if (error) {
                    console.error("sakshi-Dart execution error:", error);
                    reject(error);
                } else if (stderr) {
                    console.error("sakshi-Dart stderr:", stderr);
                    reject(stderr);
                } else {
                    console.log("sakshi-Dart stdout:", stdout);
                    resolve(stdout);
                }
            }
        );
    });
};
module.exports = {
    executeDart
}