const FS = require('fs')
,__ = require('underscore')
,ENV = require("./.env.json")
;


const get_files = async (root_dir,ext) =>{

	return new Promise((resolve, reject)=>{

FS.readdir(root_dir, (err, items)=>{
    resolve(__.filter(items,(itm)=>{
        	return (
						itm.indexOf(ext)>0
&& itm.indexOf("f11")>=0
					)
        }))

});

});
}//get_files

const get_file = async (file) =>{

var filex=file;
	return new Promise((resolve, reject)=>{
		console.log("get_filing ",filex);

FS.readFile(filex,(err, guts)=>{
	if(err)reject(err)
    resolve(guts)
});//readfile

});//promise
}//git_file

const get_processed = async (fountainobs) =>{

console.log("entering processed promise...")
	return new Promise((resolve, reject)=>{
console.log("in processed promise...")

		let proc = __.map(fountainobs,async (FOB)=>{
			let _HTML = await get_file(FOB.fountain)
			,_FM=await get_file(FOB.fm)
			return {
				html:_HTML
				,fm:_FM
			}
		});

		resolve(proc)

});
}//get_files


const get_configured = async (fountains) =>{
let configured = __.map(fountains,(FOG)=>{
	let _FOG = ENV.HTMLZ+"/"+FOG
	,_KEY=_FOG.split(".")[0].split("/")[_FOG.split(".")[0].split("/").length-1]
	,_FM=ENV.FMZ+"/"+_KEY+".json"
	return {
		fountain:_FOG
		,fm:_FM
		,key:_KEY
		,out:ENV.OUTZ+"/"+_KEY+".html"
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

let fountainz = await get_files(ENV.HTMLZ,'html');
// console.log("fountainz",fountainz);
let fmz = await get_files(ENV.FMZ,"json");
// console.log("fmz.length",fmz.length);
let configured = await get_configured(fountainz,fmz);
// console.log("configured:",configured);

let processed = await get_processed(configured);
console.log("processed:",processed);

}

_GEN();
