var express = require('express');
var router = express.Router();
const fs = require('fs-extra')
const path = require('path')

const rootFileDir = path.join(__dirname, '..', 'files')


router.get('/*', function (req, res, next) {
  const relPath = req.path.split('/')

  const dirPath = path.join(rootFileDir, ...relPath)
  if (isDir(dirPath)) {
    const files = fs.readdirSync(dirPath)
    const filePaths = files.map(file => getRelPath(req.path, file))
    res.render('index', { files: filePaths });
  } else {
    res.redirect('/files' + req.path)
  }
})


function isDir(fp) {
  return fs.lstatSync(fp).isDirectory()
}


function getRelPath(rootPath, fileName) {
  return `${rootPath === '/' ? '' : rootPath}/${fileName}`
}


// app.get('/trash', function (req, res, next) {

//   const fileMap = { type: 'dir', name: '' }
//   try {
//     getFSData(rootFileDir, fileMap)
//   } catch (err) {
//     console.log(err)
//   }
//   console.log(fileMap)
//   res.json(fileMap)
// })

// function getFSData(fp, submap) {
//   submap.children = []

//   const files = fs.readdirSync(fp)
//   files.forEach((file) => {
//     const nextfp = path.join(fp, file)
//     if (isDir(nextfp)) {
//       submap.children.push({ type: 'dir', name: file })
//       getFSData(nextfp, submap.children[submap.children.length - 1])
//     } else {
//       submap.children.push({ type: 'file', name: file })
//     }
//   })
// }

module.exports = router;
