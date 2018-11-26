const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
class Web3Provider extends Component {
    constructor(props) {
        super(props);
        this.props.fetchAccounts();
        this.props.fetchNetwork();
        this.interval = null;
        this.networkInterval = null;
    }

    /**
     * Start polling accounts, & network. We poll indefinitely so that we can
     * react to the user changing accounts or networks.
     */
    componentDidMount() {
        this.props.fetchAccounts();
        this.props.fetchNetwork();
        this.initPoll();
        this.initNetworkPoll();
    }

    /**
     * Init Web3/account polling, and prevent duplicate interval.
     * @return {void}
     */
    initPoll() {
        if (!this.interval) {
            this.interval = setInterval(this.props.fetchAccounts, ONE_SECOND);
        }
    }

    /**
     * Init network polling, and prevent duplicate intervals.
     * @return {void}
     */
    initNetworkPoll() {
        if (!this.networkInterval) {
            this.networkInterval = setInterval(this.props.fetchNetwork, ONE_MINUTE);
        }
    }

    render() {
        return null;
    }
}
const mapStateToProps = state => {
    const { accounts_fetched, account_exists, account_selected, accounts } = state.accounts;
    const { network_fetched, network_id } = state.network;

    return { accounts_fetched, account_exists, accounts, account_selected, network_fetched, network_id };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({ fetchAccounts, fetchNetwork }, dispatch)
);

const hoc = connect(mapStateToProps, mapDispatchToProps)(Web3Provider);

// EXPORT COMPONENT

export { hoc as Web3Provider };