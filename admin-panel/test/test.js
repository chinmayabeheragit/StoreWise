// test/test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Billing Api', () => {
    /**
     * Test the GET route
     */
    describe('Banner API', () => {
        /**
         * Test the POST route
         */
        describe("POST /banners/add", () => {
            it("it should add a new banner", (done) => {
                // Mock banner data
                const banner = {
                    title: "New Banner",
                    imageUrl: "http://example.com/banner.jpg",
                    link: "http://example.com"
                };
    
                // Replace with the necessary headers for authentication if needed
                chai.request(server)
                    .post('/banners/add')
                    .set('Authorization', 'Bearer your_auth_token') // Adjust if your auth middleware requires this
                    .send(banner)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('object');
                        response.body.should.have.property('message').eql('Banner added successfully');
                        done();
                    });
            });
        });
    
        /**
         * Test the GET route (list all banners)
         */
        describe("GET /banners", () => {
            it("it should get all the banners", (done) => {
                chai.request(server)
                    .get('/banners')
                    .set('Authorization', 'Bearer your_auth_token') // Adjust if your auth middleware requires this
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('array');
                        done();
                    });
            });
        });
    
        /**
         * Test the GET (by id) route
         */
        describe("GET /banners/view/:id", () => {
            it("it should get a banner by the given id", (done) => {
                const bannerId = 'validBannerId'; // Replace with a valid banner ID
                chai.request(server)
                    .get(`/banners/view/${bannerId}`)
                    .set('Authorization', 'Bearer your_auth_token') // Adjust if your auth middleware requires this
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('object');
                        response.body.should.have.property('id').eql(bannerId);
                        done();
                    });
            });
        });
    
        /**
         * Test the PUT route
         */
        describe("PUT /banners/edit/:id", () => {
            it("it should update a banner by the given id", (done) => {
                const bannerId = 'validBannerId'; // Replace with a valid banner ID
                const updatedBanner = {
                    title: "Updated Banner",
                    imageUrl: "http://example.com/updated-banner.jpg",
                    link: "http://example.com/updated"
                };
    
                chai.request(server)
                    .put(`/banners/edit/${bannerId}`)
                    .set('Authorization', 'Bearer your_auth_token') // Adjust if your auth middleware requires this
                    .send(updatedBanner)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('object');
                        response.body.should.have.property('message').eql('Banner updated successfully');
                        done();
                    });
            });
        });
    
        /**
         * Test the DELETE route
         */
        describe("DELETE /banners/delete/:id", () => {
            it("it should delete a banner by the given id", (done) => {
                const bannerId = 'validBannerId'; // Replace with a valid banner ID
                chai.request(server)
                    .delete(`/banners/delete/${bannerId}`)
                    .set('Authorization', 'Bearer your_auth_token') // Adjust if your auth middleware requires this
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('object');
                        response.body.should.have.property('message').eql('Banner deleted successfully');
                        done();
                    });
            });
        });
    });
    

    /**
     * Test the GET (by id) route
     */

    /**
     * The POST route
     */

    /**
     * The PUT route
     */

    /**
     * The Delete Route
     */
});
