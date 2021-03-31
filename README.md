# Frontend HRIS Project
### `Project Stack`
1. ReactJS
2. Material-UI
3. Redux & React-Redux
4. TailwindCSS
5. [Fuse React](http://react-material.fusetheme.com/documentation/getting-started/introduction)
### `Installation`

## A. Installing Prerequisites
Download and install at least LTS or the latest version of Node.js from its web site.
Download and install the latest Yarn `npm i -g yarn`

### B. Installing Project Dependecies
run `yarn`

### C. Start Project
run `yarn start`

### `Project Folder Structure`

    .
    ├──  Public                 # Stactic files 
    ├── src                     # Source files 
    
### Source files
The actual source files of a software project are usually stored inside the
`src` folder

    .
    ├── ...
    ├── src                    # Source files
    │   ├── app                # Application folder
    │   ├── assets             # Project Assets
    │   ├── utils              # Utility Folder(helper `functions`)
    │   └── styles             # Css files for tailwindcss and globa css
    └── ...
##### App folder

    .
    ├── ...
        ├── app               # Application folder
        │   ├── auth          # Authentication files(`Auth.js` `authRoles.js`  `logout.js` `redirectUrl.js`)
        │   ├── fuse-configs  # React-fuse theme congif folder for application route , app navigations and themes(`navigationConfig,js` `routesConfig.js` `settingConfig` `themesConfig`)
        │   ├── fuse-layouts  # Application layout
        │   ├── hooks         # Shared custom hooks
        │   ├── main          # Application main folder that contains each feature in the application
        │   ├── services      # axios instance (`api.js`)
        │   ├── shared        # Shared Components
        │   └── store         # Application Redux Store config and shared state
        └── ...

##### Main folder

    .
    ├── ...
        ├── main                                 # Application main folder that contains each feature in the application
        │   ├── feature-name                     # Feature folder with feature name as folder name
        │   │   ├── components                   # Feature components
        │   │   ├── hooks                        # Feture custom hook
        │   │   ├── store                        # Feature redux state
        │   │   ├── feature-name-config.js       # Feature config file that utilize react fuse routes and themeing
        └── ...
        
 ### `Current bugs`
 ##### EMPLOYEE PROFILE MANAGEMENT:
 1. The delete function deletes all users
 2. Error attached to fields in employee profile while editing are not supposed to be visible. After clicking on edit, click on submit before actually editing.
 3. HR can only edit Employee Profile
 4. Picture upload not functional
##### EMPLOYEE ONBOARDING:
1. Employee can not update passport in ID card issusance form passport
2. Employee can not add reference details in reference details request form
    

