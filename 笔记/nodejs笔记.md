[详细教程](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434501497361a4e77c055f5c4a8da2d5a1868df36ad1000)
#基本模块

**fs 模块**

>Node.js内置的fs模块就是文件系统模块，负责读写文件

异步读文件：

    'use strict';
	var fs = require('fs');

	fs.readFile('sample.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
	});
>请注意，sample.txt文件必须在当前目录下，且文件编码为utf-8


>当读取二进制文件时，不传入文件编码时，回调函数的data参数将返回一个Buffer对象。在Node.js中，Buffer对象就是一个包含零个或任意个字节的数组（注意和Array不同）。

同步读：

	try {
    var data = fs.readFileSync('sample.txt', 'utf-8');
    console.log(data);
	} catch (err) {
    // 出错了
	}
>同步读直接返回读到的数据

异步写入：

	'use strict';
	var fs = require('fs');
	var data = 'Hello, Node.js';
	fs.writeFile('output.txt', data, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('ok.');
    }
	});

同步写入：
	'use strict';
	var fs = require('fs');

	var data = 'Hello, Node.js';
	fs.writeFileSync('output.txt', data);

stat：
>如果我们要获取文件大小，创建时间等信息，可以使用fs.stat()，它返回一个Stat对象，能告诉我们文件或目录的详细信息：

	'use strict';
	var fs = require('fs');

	fs.stat('sample.txt', function (err, stat) {
    if (err) {
        console.log(err);
    } else {
        // 是否是文件:
        console.log('isFile: ' + stat.isFile());
        // 是否是目录:
        console.log('isDirectory: ' + stat.isDirectory());
        if (stat.isFile()) {
            // 文件大小:
            console.log('size: ' + stat.size);
            // 创建时间, Date对象:
            console.log('birth time: ' + stat.birthtime);
            // 修改时间, Date对象:
            console.log('modified time: ' + stat.mtime);
        }
    }
	});

>由于Node环境执行的JavaScript代码是服务器端代码，所以，绝大部分需要在服务器运行期反复执行业务逻辑的代码，必须使用异步代码

**stream 模块**
>stream是Node.js提供的又一个仅在服务区端可用的模块，目的是支持“流”这种数据结构。

>在Node.js中，流也是一个对象，我们只需要响应流的事件就可以了：data事件表示流的数据已经可以读取了，end事件表示这个流已经到末尾了，没有数据可以读取了，error事件表示出错了。

从文件流读取：

	'use strict';
	var fs = require('fs');

	// 打开一个流:
	var rs = fs.createReadStream('sample.txt', 'utf-8');

	rs.on('data', function (chunk) {
    console.log('DATA:')
    console.log(chunk);
	});

	rs.on('end', function () {
    console.log('END');
	});

	rs.on('error', function (err) {
    console.log('ERROR: ' + err);
	});

以文件流写入：
	'use strict';
	var fs = require('fs');

	var ws1 = fs.createWriteStream('output1.txt', 'utf-8');
	ws1.write('使用Stream写入文本数据...\n');
	ws1.write('END.');
	ws1.end();
pipe：

>一个Readable流和一个Writable流串起来后，所有的数据自动从Readable流进入Writable流，这种操作叫pipe。
>在Node.js中，Readable流有一个pipe()方法，就是用来干这件事的。

	'use strict';
	var fs = require('fs');

	var rs = fs.createReadStream('sample.txt');
	var ws = fs.createWriteStream('copied.txt');
	rs.pipe(ws);

**http 模块**

>Node.js开发的目的就是为了用JavaScript编写Web服务器程序

>应用程序并不直接和HTTP协议打交道，而是操作http模块提供的request和response对象。

	'use strict';
	// 导入http模块:
	var http = require('http');
	// 创建http server，并传入回调函数:
	var server = http.createServer(function (request, response) {
    // 回调函数接收request和response对象,
    // 获得HTTP请求的method和url:
    console.log(request.method + ': ' + request.url);
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    response.writeHead(200, {'Content-Type': 'text/html'});
    // 将HTTP响应的HTML内容写入response:
    response.end('<h1>Hello world!</h1>');
	});

	// 让服务器监听8080端口:
	server.listen(8080);

	console.log('Server is running at http://127.0.0.1:8080/');

