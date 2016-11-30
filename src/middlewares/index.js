module.exports = (app,fs) => {
    let modules = {}
    let module_files = fs.readdirSync(__dirname)
    for(let i=0;i< module_files.length;i++){
        // ignore index.js and . files
        if(module_files[i] != 'index.js'){
            let module_name = module_files[i].split('.')[0];
            modules[module_name] = require(__dirname+'/'+module_files[i])(app)
            console.log(modules[module_name]);
        }
    }
    return modules
}
