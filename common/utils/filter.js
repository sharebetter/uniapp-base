module.exports = {
	// 删除前后空格
	filterSpace(str){
		return str.replace(/(^\s*)|(\s*$)/g, "")
	}
}