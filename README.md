Link to the video: https://www.youtube.com/watch?v=mUCH6MyhMBk

# eShop - An Online Shopping Platform with a "Create Request" Feature

## Revolutionizing the Online Shopping Experience
eShop is a modern and user-friendly online shopping platform built with cutting-edge web technologies. It introduces a unique "Create Request" feature that empowers buyers to request specific products or customized items they can't find on the platform, bridging the gap between buyers and sellers.

## Key Features
* Create Request: Users can create requests for products they are unable to find on the platform, specifying details such as product name, category, specifications, price range, and even upload reference images.
* Secure Authentication: Implemented using industry-standard encryption libraries like bcrypt and JSON Web Tokens, ensuring the safety of user information.
* Responsive Design: The platform is built with a responsive design, ensuring a seamless shopping experience across different devices, including desktops, tablets, and mobile phones.
* User-Friendly Interface: The intuitive and visually appealing interface, powered by ReactJS and Tailwind CSS, provides a smooth and enjoyable shopping experience.
* Seller Dashboard: Sellers can manage their products, view and respond to user requests, and offer discounted prices for requested items.

## Installation and Usage (for End-Users)

### Clone the repository
```
git clone https://github.com/Shreejal170/eShop
```
### Navigate to the project directory
```
cd eShop
```
### Install the dependencies
```
npm install
```

## Configuration
### Before running the application, you need to configure some environment variables:
1. Create a .env file in the backend directory.
2. Set the following variables in the .env file:
```
DATABASE="connection string to mongodb"
JWTSECRET="anykey"
```
> [!NOTE]
> You can check the repository for an idea of what these values should be. The JWTSECRET can be any string.

## Running the Application
1. Start the backend server using nodemon. Note the port that the server is running on (usually port 5000).
![Screenshot 2024-05-13 155559](https://github.com/Shreejal170/eShop/assets/71423666/50111746-0718-41a4-9989-62036f6d9943)
2. In the frontend directory, create a .env file and set your private IP address and the port number where the backend is hosted. For example: 192.168.*.*:5000.
![Screenshot 2024-05-13 155706](https://github.com/Shreejal170/eShop/assets/71423666/0ec94550-7945-4f6b-aa58-ed5a7819a0ed)
![Screenshot 2024-05-13 155808](https://github.com/Shreejal170/eShop/assets/71423666/0c758789-6934-4e85-9cba-2e7cf556a36b)
```
This will allow you to test your application in mobile phones which are connected in the same network.
```
3. Run the application:
```
npm run
```
> **NOTE:** You can also set up a command to run both programs concurrently.

> **IMPORTANT:** Before you begin exploring the user interface, it’s best to create a seller account and post some products which will be shown in the user interface.


## Installation and Usage (for Contributors)

Follow the steps mentioned in the "Installation and Usage (for End-Users)" section.
Create a new branch for your feature or bug fix: git checkout -b my-new-feature
Make the necessary changes and commit them: git commit -m 'Add some feature'
Push to the branch: git push origin my-new-feature
Submit a pull request describing your changes.

## Contributor Expectations
I welcome contributions to improve eShop! If you would like to contribute, please follow these guidelines:

Fork the repository and create a new branch for your feature or bug fix.
Ensure that your code follows the project's coding style and conventions.
Write clear and concise commit messages.
Document any new features or changes in the codebase.
Test your changes thoroughly before submitting a pull request.
Include relevant issue numbers in your pull request description.

