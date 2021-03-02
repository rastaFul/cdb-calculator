import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class HeaderBar extends Component {

    render() {
        return <div>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6">
                        Calculadora de investimentos - CDB
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    }
}

export default HeaderBar;