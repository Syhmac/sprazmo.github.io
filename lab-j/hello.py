import platform, sys

name = 'Samuel'
index_no = 57931
py_ver = platform.python_version()
exec_dir = sys.executable

print(f'Hello {name} ({index_no}). This environment is using Python version {py_ver} at location {exec_dir}.')