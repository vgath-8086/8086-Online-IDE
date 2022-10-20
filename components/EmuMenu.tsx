

interface EmuMenuProps {

}

export default function EmuMenu(props: EmuMenuProps) {
    return (
        <div>
            <div>
                <button>
                    <span>Reload</span>
                    <img src="#" alt="reload button" />
                </button>

                <button>
                    <span>Step Back</span>
                    <img src="#" alt="step back button" />
                </button>

                <button>
                    <span>Single Step</span>
                    <img src="#" alt="single step button" />
                </button>

                <button>
                    <span>Run</span>
                    <img src="#" alt="run button" />
                </button>
            </div>
        </div>
    )
}
