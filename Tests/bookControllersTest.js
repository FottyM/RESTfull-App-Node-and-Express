var should = require('should'),
    sinon = require('sinon');


describe('Books controller test: ', function () {
    
    describe('Post',function () {
        
        it('Should not allow post on empty title ', function () {
            
            var Book = function (book) {this.save = function(){}};

            var req = {
                body: {
                    author:'Raphael'
                }
            };
            
            var res = {
                status: sinon.spy(),
                send:sinon.spy()
            };
            var bookController = require('../Controllers/bookControllers')(Book);
            bookController.post(req,res);
            res.status.calledWith(400).should.equal(true,"bad status " + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);
        });
        
    });
    
    
    
});

