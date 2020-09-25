
const currentPath = []
let rootData, rootElem

window.onload = () => {
    rootElem = document.getElementById('root')

    fetch('./files')
        .then(response => response.json())
        .then(data => {
            rootData = data
            loadDataToRoot(rootData, [''])
        });
}

const clearRoot = () => {
    rootElem.innerHTML = ''
}

const back = () => {
    currentPath.pop()
    const data = getPathData(rootData, currentPath)
    loadDataToRoot(data, currentPath)
}

const getPathData = (data, path) => {
    let dirData = data
    path.forEach(dir => {
        dirData = data.children[dir]
    })
    return dirData
}

const loadDataToRoot = (data, cp) => {
    clearRoot()
    currentPath.push(data.name)

    data.children.forEach(file => {
        let fileP
        if (file.type === 'dir') {
            fileP = document.createElement('p')
            fileP.innerText = file.name
            fileP.onclick = () => { loadDataToRoot(file, [...cp, file.name]) }
        } else if (file.type === 'file') {
            fileP = document.createElement('a')
            fileP.innerText = file.name
            fileP.setAttribute('href', cp.join('/')+'/'+file.name)
        }
        rootElem.appendChild(fileP)
    })
}