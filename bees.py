import sys
import os
import shutil
''' Python module by @Ekawa'''

BEES = os.path.dirname(os.path.realpath(__file__))
DESKTOP = rf"C:\Users\ederh\Desktop"


class MissingArgError(Exception):
    pass


class NotAWebApp(Exception):
    pass


def get_call():
    try:
        call = sys.argv[1]
        return call
    except IndexError:
        raise MissingArgError(
            "You must specify an action to call. It can be : python | react | nextjs | api | import | export")


def get_args():
    call = get_call()
    try:
        arg = sys.argv[2]
        return call, arg
    except IndexError:
        if call == "import" or call == "export":
            return call, None
        else:
            raise MissingArgError("You must specify a project name")


def import_components(dir=None):
    cwd = dir if dir else os.getcwd()
    lib = os.path.join(BEES, "lib")
    print("Importing components to Bees...")
    shutil.copytree(lib, os.path.join(cwd, ".bees"))
    print("Done !")
    return cwd


def export_components():
    cwd = os.getcwd()
    folder = cwd.split("\\")[-1]
    dest = os.path.join(BEES, "lib", folder)

    if os.path.isdir(dest):
        confirm = input(f"Are you sure you want to overwrite {folder} ? [Y/n]")
        if confirm == "Y":
            shutil.rmtree(dest)
        else:
            return folder
    print(f"Exporting components...")
    shutil.copytree(cwd, dest)
    print("Done !")
    return folder


def create_python_project(project_name):
    path_project = os.path.join(DESKTOP, project_name)
    template_main = '''#!bin/env/python \n\n"Python module by @ Ekawa" \n\nif __name__ == "__main__": \n\tprint("Hello world")\n'''
    print(f"Creating {project_name} python app...")
    os.mkdir(path_project)
    with open(os.path.join(path_project, "main.py"), 'w') as f:
        f.write(template_main)

    os.system(f"mkvirtualenv {project_name}")
    os.system(rf"code {path_project}")
    print("Done !")
    return path_project


def create_web_app(stack, project_name):
    if stack and (stack == "react" or stack == "nextjs"):
        if stack == "react":
            url = "https://github.com/EkawaD/nano-react.git"
        if stack == "nextjs":
            url = "https://github.com/EkawaD/nano-nextjs.git"
    else:
        raise NotAWebApp("Only react and nextjs are supported for now")

    path_project = os.path.join(DESKTOP, project_name)
    print(f"Creating {project_name} {stack} app...")
    os.system(
        f"git clone {url} {path_project}"
    )
    print("Done !")
    import_components(path_project)
    os.system(f"cd {path_project} && yarn")
    os.system(f"code {path_project}")


def switch_action(call, arg):
    if call == "import":
        import_components()
    if call == "export":
        export_components()
    if call == "python":
        create_python_project(arg)
    if call == "react":
        create_web_app("react", arg)
    if call == "nextjs":
        create_web_app("nextjs", arg)
    if call == "api":
        create_web_app("api", arg)


if __name__ == "__main__":
    try:
        call, arg = get_args()
        switch_action(call, arg)
    except Exception as e:
        print(e)
