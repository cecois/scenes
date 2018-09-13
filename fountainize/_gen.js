const FS = require('fs')
,__ = require('underscore')
,ENV = require("./.env.json")
;

const get_files = async (root_dir,ext) =>{

	return new Promise((resolve, reject)=>{
		console.log("in promise of get_files");

FS.readdir(root_dir, (err, items)=>{
    resolve(__.filter(items,(itm)=>{
        	return (itm.indexOf(ext)>0)
        }))
 
});

});
}//get_files

const git_file = async (file) =>{

	return new Promise((resolve, reject)=>{
		console.log("in promise of git_file");

FS.readFile(file, (err, guts)=>{
    resolve(guts)
});//readfile

});//promise
}//git_file

const get_configured = async (fountains) =>{
let configured = __.map(fountains,(FOG)=>{
	return {
		fountain:FOG
		,fm:ENV.FMZ+"/"+FOG.split(".")[0]+".json"
	}
});

	return new Promise((resolve, reject)=>{
		console.log("in promise of get_configured");

resolve(
configured
	)//resolve

});
}//get_files


const _GEN = async () =>{

let fountainz = await get_files(ENV.FOUNTAINZ,'fountain');
let fmz = await get_files(ENV.FMZ,"json");
let configured = await get_configured(fountainz,fmz);

console.log("configured:",configured);

}

_GEN();
