import React from 'react';
import axios from 'axios';
import { footerApi, storeId, accessToken } from '../../../public/constants/constants';
import Footer from '../../components/Footer/footer';
import '../../../public/styles/footerContainer/footerContainer.scss';
import { Alert } from 'react-bootstrap';

class FooterContainer extends React.Component {
    constructor() {
        super();
        this.callFooterApi = this.callFooterApi.bind(this);
        this.state = {
            data: {},
            loading: true,
            error: false,
        }
    }

    componentDidMount() {
        this.callFooterApi();
    }

    callFooterApi() {
            axios.get(footerApi, { 'headers': { 'store_id': storeId, 'access_token': accessToken } }).then(response => {
                this.setState({
                    footer: response.data,
                    loading: false
                });
            }).catch(error => {
                this.setState({
                    error: error.message,
                    loading: false
                });
            });
    }

    render() {
        return(
            <footer>
                { !this.state.loading ? (
                    <div>
                        {!this.state.error && this.state.footer.status === 'success' ? (
                            <Footer
                                links={this.state.footer.data.Footer_Links}
                                newsletter={this.state.footer.data.Footer_Newsletter_Data}
                                socialicons={this.state.footer.data.Footer_Social_Data}             
                            />
                        ) : (
                            <Alert className='alert-danger text-center'>Something Went Wrong!</Alert>                
                        )}
                    </div>
                ) : (
                    <Alert className='alert-primary text-center'>Footer is loading please wait....</Alert>
                )}
            </footer>
        )
    }
}

export default FooterContainer;