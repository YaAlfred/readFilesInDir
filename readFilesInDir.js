const fs = require('fs');

const readFilesInFolder = (dir, ext) => fs.readdir(dir, {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    files.forEach(dirent => {
        if(dirent.isDirectory()) {
            //read next
            fixFilesInFolder(dir + "/" + dirent.name, ext);
        } else if (dirent.isFile()) {
            let dirent_file_splitted = dirent.name.split('.'),
                isJsFile = dirent_file_splitted[dirent_file_splitted.length - 1] === ext;
            if(isJsFile) {
                console.log(dir + "/" + dirent.name, "is ready");

            }
        }
    });
});

readFilesInFolder("./src", "js");