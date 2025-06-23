import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table } from "../ui/table/table";
import { Button } from "../ui/button/button";
import { InputField } from "../ui/input-field/input-field";

@Component({
  selector: 'app-page',
  imports: [CommonModule, Table, Button, InputField ],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page {}
