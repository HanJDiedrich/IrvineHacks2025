import mysql.connector     # For connecting to SQL database

# Database Configuration
CONFIG = {
    'host' : '',
    'user' : '',
    'password' : '',
    'database' : ''
}

class MySQLManager():
    def __init__(self):
        self.connection = mysql.connector.connect(**CONFIG)
        self.cursor = self.connection.cursor()
    
    # Read commands from an SQL file
    def _execute_sql_commands(self, filepath):
        try: 
            with open(filepath, 'r') as sql_file:
                sql_commands = sql_file.read()

            for command in sql_commands.split(';'):
                if command.strip():
                    self.cursor.execute(command)
            
            self.connection.commit()
        except mysql.connector.Error as e:
            print(f"Command execution error: {e}.")


    # # Execute commands from python file 
    # def _execute_write(self, query : str):
    #     with self.connection.cursor() as cursor:
    #         try:
    #             cursor.execute(query)
    #         except mysql.connector.Error as e:
    #             print(f"Write error: {e}")
    #         else:
    #             self.connection.commit()
    #             print("Write successful.")

    # # I DON'T KNOW IF READ WORKS
    # def _execute_read(self, query):
    #     with self.connection.cursor(buffered=True) as cursor:
    #         try:
    #             cursor.execute(query)
    #         except mysql.connector.Error as e:
    #             print(f"Read error: {e}")
    #         else:
    #             self.connection.commit()
    #             self.printTable(cursor.fetchall())


    # def printTable(self, table : list):
    #     for record in table:
    #         record = ["NULL" if v is None else str(v) for v in record]
    #         print(','.join(record))

if __name__ == '__main__':
    manager = MySQLManager()
    sql_filepath = "sampleData.sql"

    manager._execute_sql_commands(sql_filepath)