const fs = require('fs');

const fixFilesInFolder = (dir, ext, wordToRemove) => fs.readdir(dir, {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    files.forEach(dirent => {
        if(dirent.isDirectory()) {
            //read next
            fixFilesInFolder(dir + "/" + dirent.name, ext, wordToRemove);
        } else if (dirent.isFile()) {
            let dirent_file_splitted = dirent.name.split('.'),
                isJsFile = dirent_file_splitted[dirent_file_splitted.length - 1] === ext;
            if(isJsFile) {
                let fileName = dir + "/" + dirent.name;
                console.log(fileName, "is ready to fix");
                fs.readFile(fileName, "utf8", (err, data) => {
                    if (err) throw err;
                    if (data.indexOf(wordToRemove) !== -1) {
                        let removedDefineLines = data.split('\n')
                            .filter((line) => line.indexOf(wordToRemove) === -1)
                            .join('\n');

                        fs.writeFile(fileName, removedDefineLines, 'utf8', function(err) {
                            if (err) throw err;
                            console.log(wordToRemove + " in " + fileName + " have been removed.");
                        });
                    }
                  });
            }
        }
    });
});

fixFilesInFolder("./src", "js", "wordToRemove");