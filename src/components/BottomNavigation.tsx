import { NavLink } from "react-router-dom";
import { Heart, Moon, Utensils, Brain, Activity } from "lucide-react";

const BottomNavigation = () => {
  const navItems = [
    { icon: Heart, label: "Pain", path: "/pain", color: "text-tertiary" },
    { icon: Moon, label: "Sleep", path: "/sleep", color: "text-primary" },
    { icon: Utensils, label: "Nutrition", path: "/nutrition", color: "text-secondary" },
    { icon: Brain, label: "Mental", path: "/mental", color: "text-tertiary" },
    { icon: Activity, label: "Risk", path: "/risk", color: "text-primary" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="glass border-t border-border/30 px-4 py-2">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? `${item.color} bg-glass/50`
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;