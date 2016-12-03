module.exports = (app,fs) => {
    let modules = {}
    let module_files = fs.readdirSync(__dirname)
    for(let i=0;i< module_files.length;i++){
        // ignore index.js and . files
        if(module_files[i] != 'index.js'){
            let module_name = module_files[i].split('.')[0];
            let module_file = new (require(__dirname+'/'+module_files[i]))(app)
            modules[module_name] = module_file
        }
    }
    return modules
}
