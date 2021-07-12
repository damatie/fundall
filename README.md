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
        │  │    ├── feature-name-config.js       # Feature config file that utilize react fuse routes and themeing
        └── ...
        
 ### `Current Bug Report`
 ##### EMPLOYEE PROFILE MANAGEMENT FEATURE:
 1. The delete function deletes all users
 2. Error attached to fields in employee profile while editing are not supposed to be visible. After clicking on edit, click on submit before actually editing.
 3. HR can only edit Employee Profile
 4. Picture upload not functional
##### EMPLOYEE ONBOARDING FEATURE:
1. Employee can not update passport in ID card issusance form passport
2. Employee can not add reference details in reference details request form
##### RECRUITMENT FEATURE:
1. When you view full detail of position on Line Manager's board, Entity Name and Department fields are empty
2. Clicking on closed openings from the Openings tab, leads to a blank page
3. When you view full detail of position on HR's board, Contact, Entity name and department name fields are empty.
4. Status Tags of positions could be better. Positions that have not been accepted by HR could be Pending and already accepted positions could be Shared or Approved.
5. What happens to positions that HR does not accept to share? Do they just remain in the DB?
6. Is the adding New Candidate sub-feature still in play? because candidates added by HR do not appear in display.
7. Sharing to email does not function.
8. Sharing to Twitter works but the message content does not currently have a contact info.
9. Description box has not been adjusted
10. Start Date and end date field names overlaps with field placeholder
11. National service should not have start and end date
    

