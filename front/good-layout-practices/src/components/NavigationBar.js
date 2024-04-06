import {Chip} from "@mui/joy";
import {Home, QuestionMark, Settings} from "@mui/icons-material";

function NavigationBar() {
    return (
        <div className={"NavBar"}>
            <div className={"NavBarWrapper"}>
                <Chip
                    size={"lg"}
                    startDecorator={<Home/>}
                    onClick={() => alert('Dashboard.')}
                >
                    Dashboard
                </Chip>
            </div>
            <div className={"NavBarWrapper"}>
                <Chip
                    size={"lg"}
                    startDecorator={<Settings/>}
                    onClick={() => alert('Account Settings.')}
                >
                    Account Settings
                </Chip>
            </div>
            <div className={"NavBarWrapper"}>
                <Chip
                    size={"lg"}
                    startDecorator={<QuestionMark/>}
                    onClick={() => alert('Frequently Asked Questions.')}
                >
                    FAQ
                </Chip>
            </div>
        </div>
    );
}

export default NavigationBar