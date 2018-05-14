var mysql = require("mysql");
var express = require("express");
var app = express();
app.use('/images',express.static(__dirname+"/public/images/" ) );

app.set("view engine","ejs");

var bodyParser = require("body-parser");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extender : false}));

var session = require("express-session");
app.use(session({secret:"pass"}));
var sess;

const fileUpload = require("express-fileupload");
app.use(fileUpload());

var uniqid = require('uniqid');

var fs = require("fs");

var cors = require("cors");
app.use (cors());

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var connection = mysql.createConnection
(
    {
        host : "localhost",
        port: 3307,
        database : "exercise",
        user: "root",
        password: "usbw"
    }
);


//--------------------------------------------------- Admin Login ----------------------------------------------

app.post("/admin_login", function(req,res)
{
    connection.query("select * from admin_login where ? and ?",
    [
        {
            admin_username : req.body.admin_name,
        },
        {
            admin_password : req.body.admin_pass,
        }
    ],

    function(err,rows)
    {
        if (err) throw err;

        let login_status;
        let nama;
        let id_admin;

        if (rows.length > 0)
        {
            login_status = "true";
            nama = req.body.admin_username;
            id_admin = rows[0].id;
        }
        else
        {
            login_status = "false";
            nama = null;
            id_admin = null;
        }
        
        res.json({login_status,nama,id_admin});
    })
})

//--------------------------------------------- Admin Dashboard ----------------------------------------------

app.get("/admin_home", function(req,res)
{
    connection.query(`SELECT * FROM season_master`, function(err,rows)
    {
        if (err) throw err;
        res.json(rows);
    });
});

app.get("/admin_category/:id", function(req,res)
{
    connection.query(`SELECT * FROM season_master where ?`,
    {
        id : req.params.id,
    },
    function(err,rows1)
    {
        connection.query(`SELECT id, category FROM product_category where ?`,
        {
            season_id : req.params.id,
        },
        function(err,rows2)
        {
            if (err) throw err;
            res.json({rows1,rows2});
        });
    })
});

app.get("/admin_product/:id", function(req,res)
{
    connection.query(`SELECT * FROM product_category where ?`,
    {
        id : req.params.id
    },
    function(err,rows1)
    {
        connection.query(`SELECT * FROM product where ?`,
            {
                product_category_id : req.params.id,
            },
            function(err,rows2)
            {
                if (err) throw err;
                res.json({rows1,rows2});
            });
    })
            
});

app.get("/admin_color/:id", function(req,res)
{
    connection.query("SELECT * FROM product where ?",
    {
        id : req.params.id
    },
    function(err,rows1)
    {
        connection.query(`SELECT id, color FROM product_color where ?`,
        {
            product_name_id : req.params.id,
        },
        function(err,rows2)
        {
            if (err) throw err;
            res.json({rows1,rows2});
        });
    }) 
});

app.get("/admin_size/:id", function(req,res)
{
    connection.query("SELECT * FROM product_color where ?",
    {
        id : req.params.id
    },
    function(err,rows1)
    {
        connection.query(`SELECT id, size, stock FROM product_size where ?`,
        {
            product_color_id : req.params.id,
        },
        function(err,rows2)
        {
            if (err) throw err;
            res.json({rows1,rows2});
        });
    })
});

//---------------------------------------------- ADMIN DELETE -------------------------------------------

app.get("/delete_season/:id", function(req,res)
{
        connection.query("delete from season_master where ?",
        {
            id: req.params.id
        });

        let redirect = "true"
        res.json(redirect);
});

app.get("/delete_category/:id", function(req,res)
{

            connection.query("delete from product_category where ?",
            {
                id: req.params.id
            });

            let redirect = "true"
            res.json(redirect); 
});

app.get("/delete_product/:id", function(req,res)
{

            // var filePath = __dirname + "/public/images/" + data1[0].product_image_name;
            // fs.unlinkSync(filePath);

            connection.query("delete from product where ?",
            {
                id: req.params.id
            });
            let redirect = "true"
            res.json(redirect);   

});

app.get("/delete_color/:id", function(req,res)
{

            connection.query("delete from product_color where ?",
            {
                id: req.params.id
            });

            let redirect = "true"
            res.json(redirect);

});

app.get("/delete_size/:id", function(req,res)
{

            connection.query("delete from product_size where ?",
            {
                id: req.params.id
            });
            
            let redirect = "true"
            res.json(redirect); 
});

//----------------------------------------------- ADMIN EDIT ------------------------------------------------

app.post('/edit_season/:id', function(req, res){

    connection.query("update season_master set ? where ?",
    [
    {
        season: req.body.edit_season,
    }
    ,
    {
        id : req.params.id,
    }
    ]);
    
    let redirect = "true"
    res.json(redirect);
})

app.post("/edit_category/:id", function(req,res)
{
        connection.query("update product_category set ? where ?",
        [
            {
                category : req.body.edit_category,
            }
        ,
            {
                id : req.params.id,
            }
        ]);

        let redirect = "true"
        res.json(redirect);
})

app.post("/edit_product/:id", function(req,res)
{
    connection.query("SELECT product_category_id, id FROM product where ?",
    {
        id : req.params.id
    },
    function(err,data1)
    {
        // if (!req.files.userfile)
        //     return res.status(400).send("No files were uploaded.");

        // let userfile = req.files.userfile;
        // var image_name = uniqid() + "." + req.files.userfile.mimetype.split("/")[1];

        // userfile.mv(__dirname + "/public/images/" + image_name, function(err) { });

        connection.query("update product set ? where ?",
        [
            {
                product_name: req.body.edit_product,
                price : req.body.edit_price,
                description : req.body.edit_description,
                // product_image_name : image_name
            }
        ,
            {
                id : req.params.id,
            }
        ]);
        let redirect = "true"
        res.json(redirect);
    })
})

app.post("/edit_color/:id", function(req,res)
{

        connection.query("update product_color set ? where ?",
        [
            {
                color: req.body.edit_color,
            }
        ,
            {
                id : req.params.id,
            }
        ]);

        let redirect = "true"
        res.json(redirect);

})

app.post("/edit_size/:id", function(req,res)
{
        connection.query("update product_size set ? where ?",
        [
            {
                size: req.body.edit_size,
                stock: req.body.edit_stock,
            }
        ,
            {
                id : req.params.id,
            }
        ]);

        let redirect = "true"
        res.json(redirect);
})

//------------------------------------------------ ADMIN ADD --------------------------------------------------

app.post('/add_season', function(req, res){

    connection.query("insert season_master set ?",
    {
        season : req.body.new_season
    });

    let redirect = "true"
    res.json(redirect);
})

app.post("/add_category/:id", function(req,res)
{
    connection.query("SELECT * FROM season_master where ?",
    {
        id : req.params.id
    },
    function(err,data1)
    {
        connection.query("insert into product_category set ?",
        {
            category: req.body.new_category,
            season_id : data1[0].id
        });
        
        let redirect = "true"
        res.json(redirect);
    })
})

app.post("/add_product/:id", upload.single('avatar'), function(req,res)
{
    // console.log(req.body);
    // console.log(req.files);
    connection.query("SELECT * FROM product_category where ?",
    {
        id : req.params.id
    },
    function(err,data1)
    {

        // let userfile = req.files.userfile;
        // var image_name = uniqid() + "." + req.files.userfile.mimetype.split("/")[1];

        // userfile.mv(__dirname + "/public/images/" + image_name, function(err) {});

        connection.query("insert into product set ?",
        {
            product_name: req.body.new_product,
            price : req.body.new_price,
            description : req.body.new_description,
            product_category_id : data1[0].id,
            // product_image_name : null
        });

        let redirect = "true"
        res.json(redirect);
    })
})

app.post("/add_color/:id", function(req,res)
{
    connection.query("SELECT * FROM product where ?",
    {
        id : req.params.id
    },
    function(err,data1)
    {
        connection.query("insert into product_color set ?",
        {
            color: req.body.new_color,
            product_name_id : data1[0].id
        });

        let redirect = "true"
        res.json(redirect);
    })
})

app.post("/add_size/:id", function(req,res)
{
    connection.query("SELECT * FROM product_color where ?",
    {
        id : req.params.id
    },
    function(err,data1)
    {
        connection.query("insert into product_size set ?",
        {
            size: req.body.new_size,
            stock: req.body.new_stock,
            product_color_id : data1[0].id
        });

        let redirect = "true"
        res.json(redirect);
    })
})

//---------------------------------------------- INVOICE ADMIN --------------------------------------------------------

app.get("/invoice_admin/:id", function(req,res)
{
        connection.query("SELECT * FROM invoice_data where ?",
        {
            kode_invoice : req.params.id
        },
        function(err,rows1)
        {
            connection.query("SELECT * FROM invoice_detail where ?",
            {
                kode_invoice : req.params.id
            },
            function(err,rows2)
            {
                if (err) throw err;
                res.json({rows1,rows2});
            })
        })
})

//------------------------------------------- INVOICE HISTORY USER ----------------------------------------------

app.get("/invoice_history_admin", function(req,res)
{
        connection.query("SELECT kode_invoice, total_price, time FROM invoice_data", function(err,rows1)
        {
            if (err) throw err;
            res.json(rows1)
        })
})

//-------------------------------------------- USER REGISTER & LOGIN -----------------------------------------------


app.post("/user_register", function(req,res)
{

    connection.query("select username from user_login where ?",
    {
        username : req.body.username,
    },
    function(err,data)
    {
        if (err) throw err;
        
        let status_register;

        if (data.length === 1)
        {
            status_register = "ERROR";
        }
        else
        {
            connection.query("insert user_login set ?",
            {
                username : req.body.username,
                password : req.body.password,
                name : req.body.name
            });
        
            status_register = "OK";
        }
        
        res.json(status_register);

    });
})

app.post("/user_login", function(req,res)
{
    
    connection.query("select id, username, password from user_login where ? and ?",
    [
        {
            username : req.body.username,
        },
        {
            password : req.body.password,
        }
    ],
    function(err,rows)
    {
        if (err) throw err;

        let login_status;
        let nama;
        let id_user;

        if (rows.length > 0)
        {
            sesi = req.session;
            sesi.user_nama = req.body.username;
            sesi.user_id = rows[0].id;
            login_status = "true";
            nama = req.body.username;
            id_user = rows[0].id;
        }
        else
        {
            login_status = "false";
            nama = null;
            id_user = null;
        }
        
        res.json({login_status,nama,id_user});
        
    })  
})

//----------------------------------------------- USER HOME -------------------------------------------------------

app.get("/", function(req,res)
{
    res.redirect("/user_home");
})

app.get("/user_home", function(req,res)
{
    connection.query(`SELECT * FROM season_master`, function(err,rows)
    {
        res.json(rows);
    });
});

//------------------------------------------- USER CATEGORY ------------------------------------------------------

app.get("/user_category/:id", function(req,res)
{
    connection.query("SELECT id, season FROM season_master where ?",
    {
        id : req.params.id
    },
    function(err,rows1)
    {
        connection.query(`SELECT id, category FROM product_category where ?`,
        {
            season_id : req.params.id,
        },
        function(err,rows2)
        {
            res.json({rows1,rows2})
        });
    })  
});

//-------------------------------------------- USER PRODUCT ---------------------------------------------------

app.get("/user_product/:id", function(req,res)
{
    connection.query("SELECT id, category FROM product_category where ?",
    {
        id : req.params.id
    },
    function(err,rows1)
    {
        connection.query(`SELECT id, product_name, price, product_image_name, description FROM product where ?`,
        {
            product_category_id : req.params.id,
        },
        function(err,rows2)
        {
            res.json({rows1,rows2})
        });
    })  
});

//------------------------------------------------ USER PRODUCT DETAILS -----------------------------------------

app.get("/user_product_details/:id", function(req,res)
{
    connection.query("SELECT id, product_name, price, description, product_image_name FROM product where ?",
    {
        id : req.params.id
    },
    function(err,rows1)
    {
        connection.query("SELECT * FROM product_color where ?",
        {
            product_name_id : rows1[0].id
        },
        function(err,rows2)
        {
            if (req.query.colorid === undefined)
            {
                res.json({rows1, rows2})
            }
            else
            {
                connection.query("SELECT * FROM product_size where ?",
                {
                    product_color_id : req.query.colorid
                },
                function(err,rows3)
                {
                    res.json({rows1,rows2,rows3})
                })
            }
        })
    })
})

//----------------------------------------------- USER CART ----------------------------------------------------

app.get("/cart/:id", function(req,res)
{
    if (req.params.id === undefined)
    {
        login_status = "false"
        res.json(login_status);
    }
    else
    {
        connection.query("SELECT * FROM cart_2 where ?",
        {
            user_login_id : req.params.id
        },
        function(err,rows)
        {
            if (err) throw err;
            // console.log(rows);
            res.json(rows);
        })
    }
})

app.post("/cart/:id", function(req,res)
{
    // console.log(req.body);
    var cart_status;

    if (req.body.namacart.length <= 0)
    {
        cart_status = "NOT_OK"
        res.json(cart_status);
    }
    else
    {
        connection.query("SELECT id, size, product_color_id FROM product_size where ?",
        {
            id : req.body.id
        },
        function(err,rows1)
        {
            connection.query("SELECT color, product_name_id FROM product_color where ?",
            {
                id : rows1[0].product_color_id
            },
            function(err,rows2)
            {
                connection.query("SELECT product_name, price FROM product where ?",
                {
                    id : rows2[0].product_name_id
                },
                function(err,rows3)
                {
                    connection.query("INSERT cart_2 set ?",
                    {
                        user_login_id : req.params.id,
                        product_size_id : rows1[0].id,
                        product_name : rows3[0].product_name,
                        price : rows3[0].price,
                        color : rows2[0].color,
                        size : rows1[0].size,
                        quantity : req.body.qtybeli
                    })

                    cart_status = "OK"

                    res.json(cart_status);
                })
            })
        })
    }
 
})

app.post("/edit_cart/:id", function(req,res)
{
    var redirect_cart;

    connection.query("update cart_2 set ? where ?",
        [
            {
                quantity : req.body.qty
            }
        ,
            {
                id : req.body.cartid
            }
        ]);
        redirect_cart = "OK";

        res.json(redirect_cart);
})

app.get("/delete_cart/:id", function(req,res)
{
    var redirect_cart;

    connection.query("delete from cart_2 where ?",
    {
        id: req.params.id
    });

    redirect_cart = "OK";
    res.json(redirect_cart);
});

//-------------------------------------------- CHECKOUT ---------------------------------------------------------

app.post("/checkout", function(req,res)
{
    var kode_invoice = "INV" + req.body.id_cart + (new Date).getMonth() + (new Date).getHours() + (new Date).getSeconds();

        connection.query("SELECT * FROM cart_2 where ?",
        {
            user_login_id : req.body.id_cart
        },
        function(err,rows1)
        {
            
            connection.query("INSERT invoice_data set ?",
            {
                username_id : rows1[0].user_login_id,
                kode_invoice : kode_invoice,
                total_price : req.body.grand_total,
                time : new Date,
                nama_penerima : req.body.nama_penerima,
                alamat_penerima : req.body.alamat_penerima,
                telp_penerima : req.body.telp_penerima
            })
            
            rows1.forEach(x => {

                connection.query("INSERT invoice_detail set ?",
                {
                    kode_invoice : kode_invoice,
                    product_name : x.product_name,
                    product_color : x.color,
                    product_size : x.size,
                    quantity : x.quantity,
                    price : x.price
                })

                connection.query("SELECT stock from product_size where ?",
                {
                    id : x.product_size_id
                },
                function(err,rows4)
                {
                    connection.query("UPDATE product_size SET ? where ?",
                    [
                        {
                            stock : rows4[0].stock - x.quantity
                        },
                        {
                            id : x.product_size_id
                        }
                    ])
                })

            })    

            connection.query("DELETE FROM cart_2 where ?",
            {
                user_login_id : req.body.id_cart
            })
        })

        var redirect_invoice = "OK";
        res.json({redirect_invoice,kode_invoice});
})

//---------------------------------------------- INVOICE USER --------------------------------------------------------

app.get("/invoice_user/:id", function(req,res)
{
        connection.query("SELECT * FROM invoice_data where ?",
        {
            kode_invoice : req.params.id
        },
        function(err,rows1)
        {
            connection.query("SELECT * FROM invoice_detail where ?",
            {
                kode_invoice : req.params.id
            },
            function(err,rows2)
            {
                if (err) throw err;
                res.json({rows1,rows2});
            })
        })
})

//------------------------------------------- INVOICE HISTORY USER ----------------------------------------------

app.get("/invoice_history_user/:id", function(req,res)
{
        connection.query("SELECT kode_invoice, total_price, time FROM invoice_data where ?",
        {
            username_id : req.params.id
        },
        function(err,rows1)
        {
            res.json(rows1)
        })
})

//----------------------------------------------- SEARCH BAR -------------------------------------------------

app.get("/search/:id", function(req,res)
{
    connection.query(`SELECT id, product_name, price, product_image_name FROM product where product_name LIKE ?`,
    '%'+req.params.id+'%',
    function (err,rows1)
    {
        res.json(rows1);
    })
})


app.listen(3001);